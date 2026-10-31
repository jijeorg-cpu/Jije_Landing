import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

/** Pre-corporate Marketplace heading; deliberately isolated from corporate styles. */
export function OriginalSectionHeading({ title, description, centered = true }: Props) {
  return (
    <div className={`original-section-heading mb-12 md:mb-16 ${centered ? "text-center" : "text-left"}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight text-[#008431]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl leading-relaxed mx-auto text-[#008431]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
