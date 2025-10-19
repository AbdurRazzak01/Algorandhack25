import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function GlassCard({children, className}:{children:React.ReactNode; className?:string;}){
  return (
    <motion.div
      initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:220,damping:24}}
      whileHover={{y:-4, boxShadow:"0 8px 30px rgba(124,77,255,0.25)"}}
      className={cn("rounded-2xl p-5 bg-panel backdrop-blur-md border border-stroke", className)}
    >
      {children}
    </motion.div>
  );
}
