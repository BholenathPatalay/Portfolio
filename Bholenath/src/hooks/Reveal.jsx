import { motion } from "framer-motion";

const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  direction = "up",
  distance = 50,
  useSpring = false,
  className = "",
  style = {},
  ...props
}) => {
  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    switch (direction) {
      case "up":
        variants.hidden.y = distance;
        variants.visible.y = 0;
        break;
      case "down":
        variants.hidden.y = -distance;
        variants.visible.y = 0;
        break;
      case "left":
        variants.hidden.x = -distance;
        variants.visible.x = 0;
        break;
      case "right":
        variants.hidden.x = distance;
        variants.visible.x = 0;
        break;
      case "scale":
        variants.hidden.scale = 0.9;
        variants.visible.scale = 1;
        break;
      case "fade":
        break;
      default:
        variants.hidden.y = distance;
        variants.visible.y = 0;
    }
    return variants;
  };

  const transition = useSpring
    ? {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay,
      }
    : {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={transition}
      style={{ ...style, willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
