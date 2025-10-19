import { motion } from "framer-motion";
import { cn } from "../utils/cn";
export default function HoloCard({children,className}:{children:React.ReactNode; className?:string;}){
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:220,damping:24}}
      whileHover={{y:-4, boxShadow:"0 12px 48px rgba(124,77,255,.35)" }}
      className={cn(
        "relative rounded-3xl p-6 bg-panel border border-white/10 backdrop-blur-xl",
        "before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:bg-gradient-to-br before:from-acc1/40 before:to-acc2/40 before:-z-10",
        className
      )}>
      {children}
    </motion.div>
  );
}
