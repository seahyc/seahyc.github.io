import test from 'node:test';
import assert from 'node:assert/strict';
import {recallState,isReviewDue,rateRecall,previewRecall} from '../static/practice/recall.mjs';
import {freshState,record,recommendation,validateImport,day} from '../static/practice/state.mjs';

const NOW=new Date('2026-09-06T12:00:00+08:00').getTime();
const DAY=86400000, MIN=60000;
const passed=(extra={})=>({passed:true,cold:true,requiresRating:true,sessionId:'s1',...extra});

test('new progress normalizes to an empty versioned recall state',()=>{assert.deepEqual(recallState({},NOW),{version:1,phase:'learning',dueAt:0,intervalDays:0,streak:0,lapses:0,lastRatedAt:0,lastCreditDay:'',pending:false,assisted:false,failed:false,history:[]});});
test('legacy due and cold days migrate without losing the interval',()=>{const r=recallState({due:'2026-09-10',coldDays:['2026-09-06','2026-09-07']},NOW);assert.equal(r.intervalDays,3);assert.equal(day(r.dueAt),'2026-09-10');assert.equal(r.streak,2);});
test('dueAt takes precedence over the legacy date',()=>{const dueAt=NOW+10*MIN;assert.equal(recallState({due:'2030-01-01',review:{dueAt}},NOW).dueAt,dueAt);});
test('review timing uses timestamps for ten minute relearning',()=>{assert.equal(isReviewDue({review:{dueAt:NOW+10*MIN}},NOW+9*MIN),false);assert.equal(isReviewDue({review:{dueAt:NOW+10*MIN}},NOW+10*MIN),true);});
test('recommendations do not treat a same-date ten minute review as immediately due',()=>{const s=freshState();s.exercises.a={passed:true,due:day(NOW),review:{dueAt:NOW+10*MIN}};const exercises=[{id:'a'},{id:'b'}];assert.equal(recommendation(exercises,s,NOW).id,'b');assert.equal(recommendation(exercises,s,NOW+10*MIN).id,'a');});
test('an independent pass waits for a rating and preserves legacy cold evidence',()=>{const s=freshState();const p=record(s,'a',passed(),NOW);assert.equal(p.review.pending,true);assert.equal(p.review.assisted,false);assert.deepEqual(p.coldDays,[day(NOW)]);});
test('assistance forces a nominal good rating to again',()=>{const s=freshState();record(s,'a',passed({cold:false}),NOW);const r=rateRecall(s,'a','good',NOW);assert.equal(r.history.at(-1).rating,'again');assert.equal(r.phase,'relearning');assert.equal(r.dueAt,NOW+10*MIN);});
test('again schedules ten minutes and records one lapse',()=>{const s=freshState();record(s,'a',passed(),NOW);const r=rateRecall(s,'a','again',NOW);assert.equal(r.dueAt,NOW+10*MIN);assert.equal(r.lapses,1);assert.equal(r.streak,0);});
test('hard schedules one day initially',()=>{const s=freshState();record(s,'a',passed(),NOW);assert.equal(rateRecall(s,'a','hard',NOW).intervalDays,1);});
test('good follows the 1 3 7 14 30 60 day ladder when each scheduled review is due',()=>{const s=freshState();const seen=[];for(let i=0;i<7;i++){const at=s.exercises.a?.review?.dueAt||NOW;record(s,'a',passed({sessionId:`s${i}`}),at);seen.push(rateRecall(s,'a','good',at).intervalDays);}assert.deepEqual(seen,[1,3,7,14,30,60,60]);});
test('same-day good ratings do not grow interval or streak',()=>{const s=freshState();record(s,'a',passed(),NOW);rateRecall(s,'a','good',NOW);record(s,'a',passed({sessionId:'s2'}),NOW+1000);const r=rateRecall(s,'a','good',NOW+1000);assert.equal(r.intervalDays,1);assert.equal(r.streak,1);});
test('good after relearning does not jump via lifetime cold days',()=>{const s=freshState();s.exercises.a={coldDays:['2026-09-01','2026-09-02','2026-09-03','2026-09-04'],review:{phase:'relearning',streak:0,intervalDays:0,pending:true,failed:false,lapses:1}};const r=rateRecall(s,'a','good',NOW);assert.equal(r.intervalDays,1);});
test('the first successful repair after observed forgetting remains a ten minute relearn',()=>{const s=freshState();record(s,'a',passed(),NOW);rateRecall(s,'a','good',NOW);record(s,'a',{passed:false,kind:'assertion',cold:true,sessionId:'s2'},NOW+DAY);record(s,'a',passed({sessionId:'s2'}),NOW+DAY+1000);const r=rateRecall(s,'a','good',NOW+DAY+1000);assert.equal(r.history.at(-1).rating,'again');assert.equal(r.dueAt,NOW+DAY+1000+10*MIN);});
test('failure during an effortful session caps good at hard',()=>{const s=freshState();record(s,'a',{passed:false,kind:'assertion',cold:true,sessionId:'s1'},NOW);record(s,'a',passed(),NOW+1000);const r=rateRecall(s,'a','good',NOW+1000);assert.equal(r.history.at(-1).rating,'hard');});
test('repeated test failures in one session count as one lapse',()=>{const s=freshState();record(s,'a',passed(),NOW);rateRecall(s,'a','good',NOW);record(s,'a',{passed:false,kind:'assertion',cold:true,sessionId:'s2'},NOW+DAY);record(s,'a',{passed:false,kind:'timeout',cold:true,sessionId:'s2'},NOW+DAY+1000);assert.equal(s.exercises.a.review.lapses,1);assert.equal(s.exercises.a.review.dueAt,NOW+DAY+10*MIN);});
test('syntax failures and scaffold failures do not create lapses',()=>{const s=freshState();record(s,'a',{passed:false,kind:'syntax',cold:true,sessionId:'s1'},NOW);record(s,'b',{passed:false,kind:'assertion',cold:false,scaffold:true,sessionId:'s2'},NOW);assert.equal(s.exercises.a.review,undefined);assert.equal(s.exercises.b.review,undefined);});
test('scaffold passes never create recurring cards',()=>{const s=freshState();record(s,'a',passed({scaffold:true,cold:false}),NOW);assert.equal(s.exercises.a.review,undefined);assert.equal(s.exercises.a.due,undefined);});
test('rating requires a pending successful retrieval and cannot repeat',()=>{const s=freshState();assert.throws(()=>rateRecall(s,'a','good',NOW));record(s,'a',passed(),NOW);rateRecall(s,'a','good',NOW);assert.throws(()=>rateRecall(s,'a','good',NOW));});
test('preview returns the effective schedule without mutation',()=>{const p={coldDays:[],review:{pending:true,assisted:true}};const before=structuredClone(p);const out=previewRecall(p,'good',NOW);assert.equal(out.rating,'again');assert.deepEqual(p,before);});
test('history is bounded to thirty ratings',()=>{const s=freshState();for(let i=0;i<35;i++){const at=NOW+i*DAY;record(s,'a',passed({sessionId:`s${i}`}),at);rateRecall(s,'a','hard',at);}assert.equal(s.exercises.a.review.history.length,30);});
test('pending ratings survive import while active cold sessions are invalidated',()=>{const s=freshState();record(s,'a',passed(),NOW);s.exercises.a.review.intervalDays=14;s.exercises.a.review.dueAt=NOW+14*DAY;s.exercises.a.session={mode:'cold',cold:true,started:NOW};const i=validateImport(s,[{id:'a',files:{}}]);assert.equal(i.exercises.a.review.pending,true);assert.equal(i.exercises.a.review.intervalDays,14);assert.equal(i.exercises.a.review.dueAt,NOW+14*DAY);assert.equal(i.exercises.a.session.cold,false);});
test('invalid imported recall data fails explicitly',()=>{const s=freshState();s.exercises.a={coldDays:[],review:{version:2,pending:true}};assert.throws(()=>validateImport(s,[{id:'a',files:{}}]));});
test('legacy record calls retain automatic scheduling at due reviews',()=>{const s=freshState();for(let i=0;i<4;i++)record(s,'a',{passed:true,cold:true},s.exercises.a?.review?.dueAt||NOW);assert.equal(s.exercises.a.due,day(NOW+25*DAY));assert.equal(s.exercises.a.review.pending,false);});

test('a later failed check invalidates a pending pass rating',()=>{const s=freshState();record(s,'a',passed(),NOW);record(s,'a',{passed:false,kind:'tests',sessionId:'s1'},NOW+1000);assert.equal(s.exercises.a.review.pending,false);assert.throws(()=>rateRecall(s,'a','good',NOW+2000));});

test('extra successful practice cannot postpone a scheduled recall or grow its interval',()=>{
 const s=freshState();record(s,'a',passed(),NOW);rateRecall(s,'a','good',NOW);
 const before=structuredClone(s.exercises.a.review);record(s,'a',passed({sessionId:'extra'}),NOW+1000);const after=rateRecall(s,'a','good',NOW+1000);
 assert.equal(after.dueAt,before.dueAt);assert.equal(after.intervalDays,before.intervalDays);assert.equal(after.streak,before.streak);assert.equal(after.history.at(-1).early,true);
});
test('an early clean rebuild cannot bypass the relearning gap',()=>{
 const s=freshState();record(s,'a',passed({cold:false}),NOW);rateRecall(s,'a','good',NOW);
 const due=s.exercises.a.review.dueAt;record(s,'a',passed({sessionId:'early'}),NOW+1000);const after=rateRecall(s,'a','good',NOW+1000);
 assert.equal(after.phase,'relearning');assert.equal(after.dueAt,due);assert.equal(after.streak,0);
});
