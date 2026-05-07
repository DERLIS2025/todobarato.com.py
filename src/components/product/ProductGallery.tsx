"use client";
import Image from "next/image";import { useState } from "react";
export function ProductGallery({images,name}:{images:string[];name:string}){const [img,setImg]=useState(images[0]);return <div><Image src={img} alt={name} width={900} height={700} className="h-[420px] w-full rounded-2xl object-cover"/><div className="mt-3 flex gap-3">{images.map(x=><button className="rounded-xl border-2 border-white ring-1 ring-slate-200" onClick={()=>setImg(x)} key={x}><Image src={x} alt={name} width={90} height={90} className="h-20 w-20 rounded-xl object-cover"/></button>)}</div></div>}
