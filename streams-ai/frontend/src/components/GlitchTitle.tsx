import { motion } from "framer-motion";
export default function GlitchTitle({text}:{text:string}){
  return (
    <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5}}
      className="text-4xl md:text-6xl font-semibold tracking-tight"
      style={{textShadow:"0 0 24px rgba(124,77,255,.35)"}}>
      <span className="bg-gradient-to-r from-acc1 to-acc2 bg-clip-text text-transparent">{text}</span>
    </motion.h1>
  );
}
