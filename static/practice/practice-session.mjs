export function canStartFreshMock(exercise, progress, mode){
 return mode==='mock'&&exercise.stage==='Mock'&&!progress.attempts&&!progress.savedAttempts?.length&&!progress.notes?.trim()&&!progress.session?.assisted&&progress.session?.mode!=='mock'&&Object.entries(progress.files||{}).every(([name,value])=>name in exercise.files&&value===exercise.files[name]);
}
