import {AbstractMesh,Color3,PBRMaterial,Vector3} from '@babylonjs/core';

/** Preserve the existing rig and silhouettes; soften split surface normals and finish the suit. */
export function finishAstronaut(meshes:AbstractMesh[]){
 for(const mesh of meshes){
  const mat=mesh.material;
  if(mat instanceof PBRMaterial){
   if(mat.name==='white'){mat.albedoColor=Color3.FromHexString('#f5e8d5').toLinearSpace();mat.metallic=0;mat.roughness=.48;}
   if(mat.name==='gray'){mat.albedoColor=Color3.FromHexString('#d98473').toLinearSpace();mat.metallic=.05;mat.roughness=.4;}
   if(mat.name==='flag'){mat.albedoTexture=null;mat.albedoColor=Color3.FromHexString('#ce7565').toLinearSpace();mat.metallic=0;mat.roughness=.5;}
   if(mat.name==='transparent_mask'){mat.albedoColor=Color3.FromHexString('#68473a').toLinearSpace();mat.metallic=.8;mat.roughness=.16;mat.clearCoat.isEnabled=true;}
   mat.maxSimultaneousLights=5;
  }
  const positions=mesh.getVerticesData('position'),normals=mesh.getVerticesData('normal');if(!positions||!normals)continue;
  const groups=new Map<string,number[]>();
  for(let i=0;i<positions.length;i+=3){const key=[positions[i],positions[i+1],positions[i+2]].map(v=>v.toFixed(5)).join(':');const group=groups.get(key)||[];group.push(i);groups.set(key,group);}
  const result=normals.slice();
  for(const group of groups.values())for(const i of group){const n=new Vector3(normals[i],normals[i+1],normals[i+2]),sum=Vector3.Zero();for(const j of group){const other=new Vector3(normals[j],normals[j+1],normals[j+2]);if(Vector3.Dot(n,other)>.25)sum.addInPlace(other);}sum.normalize();result[i]=sum.x;result[i+1]=sum.y;result[i+2]=sum.z;}
  mesh.setVerticesData('normal',result,true);
 }
}
