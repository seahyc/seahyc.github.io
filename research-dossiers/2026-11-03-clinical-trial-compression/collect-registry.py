"""Public registry prospecting snapshot, not recruitment-capacity or causal evidence."""
from pathlib import Path
import urllib.request, urllib.parse, json, hashlib, datetime
OUT=Path(__file__).parent
params={'query.cond':'atopic dermatitis','filter.overallStatus':'RECRUITING','pageSize':10,'countTotal':'true','format':'json'}
url='https://clinicaltrials.gov/api/v2/studies?'+urllib.parse.urlencode(params)
def get(u):
    with urllib.request.urlopen(u,timeout=40) as r:return r.read()
raw=get(url); data=json.loads(raw); version=json.loads(get('https://clinicaltrials.gov/api/v2/version'))
(OUT/'registry-sample.json').write_bytes(raw)
summary={'retrieved_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'url':url,'version':version,'sha256':hashlib.sha256(raw).hexdigest(),'api_totalCount':data['totalCount'],'returned_records':len(data['studies']),'scope':'First API page only; no sort specified. Broad condition search, all phases and sponsor types; NOT the commercial target cohort. No patient-level data.','records':[]}
for s in data['studies']:
    p=s['protocolSection']; id=p['identificationModule']; st=p['statusModule']; de=p.get('designModule',{})
    summary['records'].append({'nctId':id['nctId'],'url':'https://clinicaltrials.gov/study/'+id['nctId'],'title':id['briefTitle'],'leadSponsor':p.get('sponsorCollaboratorsModule',{}).get('leadSponsor',{}),'phases':de.get('phases',[]),'studyType':de.get('studyType'),'enrollment':de.get('enrollmentInfo',{}),'status':st['overallStatus'],'lastUpdate':st.get('lastUpdatePostDateStruct'),'start':st.get('startDateStruct'),'primaryCompletion':st.get('primaryCompletionDateStruct'),'locationCountries':sorted({l.get('country','') for l in p.get('contactsLocationsModule',{}).get('locations',[])})})
(OUT/'registry-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
print('retrieved',summary['retrieved_at_utc']); print('data version',version); print('total broad condition hits',summary['api_totalCount'],'records preserved',summary['returned_records']); print('sha256',summary['sha256'])
for r in summary['records']: print(r['nctId'],r['studyType'],','.join(r['phases']),r['leadSponsor'].get('class'),r['lastUpdate'])
