import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Instagram,
  Layers,
  LineChart,
  MessageCircle,
  Minus,
  PieChart,
  Play,
  Plus,
  Settings,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const SHOPIER_LINK =
  'https://www.shopier.com/mentorixpro?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnzH8fCVvs78sOXTRSOrh8xThjzQ_NVesWOzu-AR-o6768rkUSO_hV1uR1KPU_aem_yIaM7jgL-JNOJUyyR09O-w';
const WHATSAPP_LINK = 'https://wa.me/905077380751';
const INSTAGRAM_LINK = 'https://www.instagram.com/mentorix.pro/';

const SECTION_BACKGROUNDS = {
  heroPoster: '/section-backgrounds/hero-poster.jpg',
  problem: '/section-backgrounds/problem.jpg',
  lgs: '/section-backgrounds/lgs.jpg',
  yks: '/section-backgrounds/yks.jpg',
  fransizca: '/section-backgrounds/fransizca.jpg',
  ingilizce: '/section-backgrounds/ingilizce.jpg',
  features: '/section-backgrounds/features.jpg',
  whyMentorix: '/section-backgrounds/why-mentorix.jpg',
  showcase: '/section-backgrounds/showcase.jpg',
  howItWorks: '/section-backgrounds/how-it-works.jpg',
  whoIsItFor: '/section-backgrounds/who-is-it-for.jpg',
  faq: '/section-backgrounds/faq.jpg',
  finalCta: '/section-backgrounds/final-cta.jpg',
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

function buildSectionBackground(imageUrl: string, extraOverlay?: string) {
  const overlay =
    extraOverlay ??
    'linear-gradient(180deg, rgba(5,5,6,0.62) 0%, rgba(5,5,6,0.78) 45%, rgba(5,5,6,0.9) 100%)';
  return `${overlay}, url('${imageUrl}')`;
}

function SectionBackground({
  image,
  overlay,
  className = '',
}: {
  image: string;
  overlay?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: buildSectionBackground(image, overlay) }}
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={SECTION_BACKGROUNDS.heroPoster}
      >
        <source src="/media/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.56)_38%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(249,115,22,0.12),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(22,101,52,0.12),transparent_22%)]" />
    </div>
  );
}

function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [duration, end, inView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function AnimatedBarChart() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const bars = [75, 90, 60, 85, 70, 95, 80];
  const colors = ['#f97316', '#166534', '#3b82f6', '#f97316', '#166534', '#3b82f6', '#f97316'];

  return (
    <div ref={ref} className="flex h-32 items-end justify-center gap-2">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          style={{ height: `${height}%`, backgroundColor: colors[i], transformOrigin: 'bottom' }}
          className="w-4 rounded-t-sm md:w-6"
        />
      ))}
    </div>
  );
}

function AnimatedLineChart() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <svg ref={ref} viewBox="0 0 200 80" className="h-20 w-full">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 10 60 Q 30 50 50 45 T 90 30 T 130 35 T 170 15 T 190 20"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
      {[
        { cx: 50, cy: 45 },
        { cx: 90, cy: 30 },
        { cx: 130, cy: 35 },
        { cx: 170, cy: 15 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.cx}
          cy={point.cy}
          r="4"
          fill="#f97316"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.45 + i * 0.16 }}
        />
      ))}
    </svg>
  );
}

function FloatingCard({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`glass-card rounded-xl p-4 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function BackgroundOrb({
  color,
  size,
  position,
  delay = 0,
}: {
  color: string;
  size: string;
  position: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${size} ${position} rounded-full blur-3xl opacity-20`}
      style={{ background: color }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.24, 0.12] }}
      transition={{ duration: 9, repeat: Infinity, delay }}
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <div className="glass flex items-center rounded-2xl px-3 py-2 shadow-[0_0_30px_rgba(249,115,22,0.10)]">
            <img
              src="/logo.png"
              alt="MENTORİX PRO logosu"
              className="h-7 w-auto object-contain sm:h-8"
              loading="eager"
            />
          </div>
          <span className="font-display hidden text-xl font-bold text-white sm:block">
            MENTORİX <span className="text-orange-500">PRO</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#products" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Ürünler
          </a>
          <a href="#features" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Özellikler
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Nasıl İşliyor
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            SSS
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-sm text-gray-300 transition-colors hover:text-green-400 sm:flex"
          >
            <MessageCircle className="h-4 w-4" />
            <span>İletişim</span>
          </a>
          <a
            href={SHOPIER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Satın Al</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <HeroVideoBackground />
      <div className="absolute inset-0">
        <BackgroundOrb
          color="linear-gradient(135deg, #f97316, #ea580c)"
          size="h-96 w-96"
          position="-left-48 top-20"
          delay={0}
        />
        <BackgroundOrb
          color="linear-gradient(135deg, #166534, #14532d)"
          size="h-80 w-80"
          position="-right-40 top-40"
          delay={2}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={scaleIn} className="mb-6 flex justify-center lg:justify-start">
              <div className="glass-strong inline-flex rounded-[22px] px-4 py-3 shadow-[0_0_40px_rgba(249,115,22,0.12)]">
                <img
                  src="/logo.png"
                  alt="MENTORİX PRO"
                  className="h-10 w-auto object-contain sm:h-12"
                  loading="eager"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-gray-300">Premium Koç Takip Sistemleri</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Koçluk Sürecinizi <span className="gradient-text-orange">Profesyonel</span> Bir Sisteme Dönüştürün
            </motion.h1>

            <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl lg:mx-0">
              LGS, YKS, Fransızca ve İngilizce koçları için geliştirilen premium takip sistemleriyle
              öğrenci yönetimini kolaylaştırın, süreci hızlandırın ve profesyonel bir düzene geçin.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#products" className="btn-primary flex items-center justify-center gap-2">
                <Play className="h-4 w-4" />
                Hemen İncele
              </a>
              <a
                href={SHOPIER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Shopier'den Satın Al
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp'tan Bilgi Al
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4"
            >
              {[
                { icon: Shield, text: 'Hazır ve Profesyonel Altyapı' },
                { icon: Users, text: 'Düzenli Öğrenci Takibi' },
                { icon: CheckCircle2, text: 'Shopier ile Güvenli Satın Alma' },
                { icon: MessageCircle, text: 'WhatsApp Destek İmkânı' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <item.icon className="h-4 w-4 text-orange-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute inset-0 scale-105 bg-gradient-to-r from-orange-500/16 via-green-500/8 to-blue-500/12 blur-3xl" />

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="relative glass-card rounded-[28px] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500">MENTORİX PRO Dashboard</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Öğrenci', value: 24, color: 'text-orange-500' },
                    { label: 'Tamamlanan', value: 156, color: 'text-green-500' },
                    { label: 'Bekleyen', value: 12, color: 'text-blue-500' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.1 }}
                      className="rounded-lg bg-zinc-800/45 p-3"
                    >
                      <p className="mb-1 text-xs text-gray-500">{stat.label}</p>
                      <p className={`text-xl font-bold ${stat.color}`}>
                        <AnimatedCounter end={stat.value} />
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-lg bg-zinc-800/45 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Haftalık Performans</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <AnimatedBarChart />
                </div>

                <div className="rounded-lg bg-zinc-800/45 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Öğrenci Gelişimi</span>
                    <LineChart className="h-4 w-4 text-orange-500" />
                  </div>
                  <AnimatedLineChart />
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'Ayşe Y.', progress: 85, subject: 'LGS' },
                    { name: 'Mehmet K.', progress: 72, subject: 'YKS' },
                    { name: 'Zeynep A.', progress: 91, subject: 'İngilizce' },
                  ].map((student, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-3 rounded-lg bg-zinc-800/25 p-2"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-xs font-medium">
                        {student.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{student.name}</span>
                          <span className="text-xs text-gray-500">{student.subject}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${student.progress}%` }}
                            transition={{ duration: 1, delay: 0.95 + i * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <FloatingCard delay={0.45} className="absolute -top-4 right-2 md:right-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">+12 Yeni Kayıt</span>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.7} className="absolute -bottom-4 left-2 md:left-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">%94 Süreç Kontrolü</span>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs">Keşfet</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const problems = [
    'Öğrenci verilerinin dağınık olması',
    'Manuel takip nedeniyle zaman kaybı',
    'Süreç kontrolünün zorlaşması',
    'Koçluk sisteminin profesyonel görünmemesi',
  ];

  const solutions = [
    'Hazır sistem',
    'Profesyonel yapı',
    'Zaman tasarrufu',
    'Düzenli takip',
    'Güçlü süreç yönetimi',
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.problem} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}>
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
            >
              Problem ve Çözüm
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
              Dağınık Takibi Bırakın, <span className="gradient-text-orange">Sisteme Geçin</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mb-8 max-w-xl text-lg leading-relaxed text-gray-300">
              MENTORİX PRO, koçluk sürecini notlardan, karışık tablolar ve manuel takipten çıkarıp tek bir profesyonel akışa taşır.
            </motion.p>

            <div className="space-y-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-card flex items-center gap-4 rounded-xl p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-gray-200">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card rounded-[28px] p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-green-500">MENTORİX PRO</p>
                <h3 className="font-display text-2xl font-semibold">Düzenli ve güven veren yapı</h3>
              </div>
            </div>
            <p className="mb-6 text-gray-300">
              Koçluk sürecinizi tek bakışta kontrol edebileceğiniz, öğrenci takibini sistemli hale getiren premium bir altyapı sunar.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {solutions.map((solution, i) => (
                <motion.div
                  key={solution}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
                  className="rounded-2xl border border-white/8 bg-white/5 p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-orange-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Avantaj</span>
                  </div>
                  <p className="font-medium text-white">{solution}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const products = [
    {
      title: 'LGS Koç Takip Sistemi',
      description:
        'LGS hazırlık sürecindeki öğrencileri takip etmek için hazırlanmış profesyonel bir koçluk sistemi. Konu takibi, deneme analizi, gelişim takibi ve süreç düzeni sağlar.',
      benefits: ['Konu takibi', 'Deneme analizi', 'Gelişim kontrolü'],
      icon: Target,
      bg: SECTION_BACKGROUNDS.lgs,
      accent: 'text-orange-500',
    },
    {
      title: 'YKS Koç Takip Sistemi',
      description:
        'TYT ve AYT hazırlık sürecini daha düzenli yönetmek isteyen koçlar için tasarlanmış kapsamlı takip sistemi. Hedef kontrolü, performans takibi ve planlı ilerleme sunar.',
      benefits: ['Hedef kontrolü', 'Performans takibi', 'Planlı ilerleme'],
      icon: BarChart3,
      bg: SECTION_BACKGROUNDS.yks,
      accent: 'text-green-500',
    },
    {
      title: 'Fransızca Koç Takip Sistemi',
      description:
        'Fransızca öğretmenleri için geliştirilen profesyonel öğrenci takip sistemi. Ders süreci, gelişim kontrolü ve düzenli akademik takip imkânı sunar.',
      benefits: ['Ders süreci', 'Gelişim kontrolü', 'Akademik düzen'],
      icon: BookOpen,
      bg: SECTION_BACKGROUNDS.fransizca,
      accent: 'text-blue-500',
    },
    {
      title: 'İngilizce Koç Takip Sistemi',
      description:
        'İngilizce öğretmenlerinin öğrenci gelişimini profesyonel şekilde takip etmesini sağlayan modern sistem. Grammar, vocabulary, ödev ve gelişim sürecini düzenli hale getirir.',
      benefits: ['Grammar takibi', 'Vocabulary düzeni', 'Ödev süreci'],
      icon: GraduationCap,
      bg: SECTION_BACKGROUNDS.ingilizce,
      accent: 'text-orange-400',
    },
  ];

  return (
    <section id="products" className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.showcase} overlay="linear-gradient(180deg, rgba(5,5,6,0.78) 0%, rgba(5,5,6,0.9) 100%)" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            Ürünler
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Hazır Kurulmuş <span className="gradient-text-orange">Premium Sistemler</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-gray-300">
            Hangi alanda koçluk veriyorsanız, düzenli ve profesyonel bir altyapıya aynı anda sahip olun.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10"
              style={{
                backgroundImage: buildSectionBackground(
                  product.bg,
                  'linear-gradient(180deg, rgba(8,8,10,0.72), rgba(8,8,10,0.9))'
                ),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 backdrop-blur-md">
                    <product.icon className={`h-7 w-7 ${product.accent}`} />
                  </div>
                  <div className="glass rounded-full px-3 py-1 text-xs text-gray-300">Premium Sistem</div>
                </div>

                <h3 className="font-display mb-4 text-2xl font-semibold">{product.title}</h3>
                <p className="mb-6 leading-relaxed text-gray-300">{product.description}</p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {product.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-sm text-gray-200"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SHOPIER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Şimdi Satın Al
                  </a>
                  <a
                    href={i === 2 ? WHATSAPP_LINK : '#showcase'}
                    target={i === 2 ? '_blank' : undefined}
                    rel={i === 2 ? 'noopener noreferrer' : undefined}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    {i === 2 ? <MessageCircle className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    {i === 2 ? "WhatsApp'tan Sor" : 'Detayları İncele'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const features = [
    { icon: Users, title: 'Öğrenci performans takibi' },
    { icon: Target, title: 'Konu kontrol sistemi' },
    { icon: Layers, title: 'Düzenli veri yönetimi' },
    { icon: Zap, title: 'Kolay kullanım' },
    { icon: Settings, title: 'Google Sheets tabanlı sistem' },
    { icon: Shield, title: 'Profesyonel koçluk altyapısı' },
    { icon: Clock, title: 'Hızlı erişim' },
    { icon: Activity, title: 'Net süreç görünümü' },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.features} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-green-500"
          >
            Özellikler
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Bir Takip Tablosundan <span className="gradient-text-orange">Fazlası</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg text-gray-300">
            MENTORİX PRO, sadece veri tutan bir yapı değil; koçluk sürecinizi daha düzenli, daha hızlı ve daha profesyonel yönetmeniz için hazırlanmış güçlü bir sistemdir.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-green-500/10">
                <feature.icon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const points = [
    'Sıfırdan sistem kurma derdini ortadan kaldırır',
    'Profesyonel bir takip altyapısı sunar',
    'Zamandan ciddi tasarruf sağlar',
    'Öğrenci sürecini net şekilde kontrol etmenizi sağlar',
    'Eğitim sürecine düzen kazandırır',
    'Premium görünür ve güven verir',
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.whyMentorix} />

      <div ref={ref} className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            Neden MENTORİX PRO?
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Güçlü süreç yönetimi ve <span className="gradient-text-orange">premium görünüm</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-8 max-w-2xl text-lg text-gray-300">
            Eğitim süreçlerinde hız, netlik ve profesyonel görünüm aynı anda gerekir. MENTORİX PRO bu üçünü tek yapıda birleştirir.
          </motion.p>

          <div className="space-y-4">
            {points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -18 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="glass-card flex items-start gap-4 rounded-xl p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-gray-200">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-[28px] p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-xl font-semibold">Değer Karşılaştırması</span>
            <Star className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-5">
            {[
              { label: 'Zaman Kazancı', value: 92 },
              { label: 'Süreç Kontrolü', value: 96 },
              { label: 'Profesyonel Görünüm', value: 98 },
              { label: 'Kullanım Kolaylığı', value: 90 },
            ].map((item, i) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-gray-300">
                  <span>{item.label}</span>
                  <span>%{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.35 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="showcase" className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.showcase} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            Uygulama Önizlemesi
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Sistemin İç Yapısını <span className="gradient-text-orange">Keşfedin</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg text-gray-300">
            Öğrenci takibini, performans görünümünü ve koçluk akışını tek ekranda profesyonel biçimde yönetin.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-[32px] p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Mentorix Dashboard</span>
              <div className="glass rounded-full px-3 py-1 text-xs text-gray-300">Canlı Veri Akışı</div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl bg-zinc-900/55 p-5">
                <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                  <span>Öğrenci Yönetim Paneli</span>
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <AnimatedLineChart />
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <AnimatedBarChart />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-zinc-900/55 p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                    <span>Genel Durum</span>
                    <PieChart className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-gray-500">Takip Oranı</p>
                      <p className="mt-2 text-2xl font-bold text-orange-500">
                        <AnimatedCounter end={94} suffix="%" />
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-gray-500">Aktif Öğrenci</p>
                      <p className="mt-2 text-2xl font-bold text-green-500">
                        <AnimatedCounter end={38} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-900/55 p-5">
                  <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
                    <span>Akış Durumu</span>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </div>
                  {[82, 68, 94].map((value, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                        <span>Panel {i + 1}</span>
                        <span>%{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${value}%` } : { width: 0 }}
                          transition={{ duration: 0.85, delay: 0.45 + i * 0.12 }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-green-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <FloatingCard className="rounded-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                  <BarChart3 className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">Analitik görünüm</p>
                  <p className="text-sm text-gray-400">Veriyi hızlı okuyun</p>
                </div>
              </div>
              <p className="text-gray-300">
                Sistemin tüm modülleri, öğretmenin veya koçun tek bakışta karar verebilmesi için premium bir düzende hazırlanır.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.12} className="rounded-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
                  <Layers className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">Düzenli katman yapısı</p>
                  <p className="text-sm text-gray-400">Kontrol ve sadelik bir arada</p>
                </div>
              </div>
              <p className="text-gray-300">
                Takip, analiz ve süreç yönetimi aynı yapı içinde düzenli katmanlar halinde sunulur.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.2} className="rounded-2xl">
              <a
                href={SHOPIER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 text-center"
              >
                <ShoppingBag className="h-4 w-4" />
                Shopier'den Satın Al
              </a>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const steps = [
    {
      number: '1',
      title: 'İhtiyacınıza uygun sistemi seçin',
      desc: 'Alanınıza göre en uygun hazır sistemi belirleyin.',
      icon: Target,
    },
    {
      number: '2',
      title: 'Shopier üzerinden güvenle satın alın',
      desc: 'Ödemenizi güvenli ve hızlı biçimde tamamlayın.',
      icon: ShoppingBag,
    },
    {
      number: '3',
      title: 'Sistem size teslim edilsin',
      desc: 'Hazır yapı size hızlıca ulaştırılsın.',
      icon: CheckCircle2,
    },
    {
      number: '4',
      title: 'Hemen kullanmaya başlayın',
      desc: 'Öğrenci takibini aynı gün profesyonel hale getirin.',
      icon: Zap,
    },
    {
      number: '5',
      title: 'Gerekirse WhatsApp üzerinden bilgi alın',
      desc: 'Satın alma öncesi veya sonrası destek alın.',
      icon: MessageCircle,
    },
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.howItWorks} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            Satın Alma Süreci
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Satın Alma Süreci <span className="gradient-text-orange">Nasıl İşliyor?</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="glass-card h-full rounded-2xl p-6 text-center">
                <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-xs font-bold shadow-lg shadow-orange-500/30">
                  {step.number}
                </div>
                <div className="mx-auto mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-green-500/10">
                  <step.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoIsItForSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const audiences = [
    {
      icon: Users,
      title: 'Bireysel öğretmenler',
      desc: 'Kendi öğrencilerini profesyonel biçimde takip etmek isteyen eğitimciler için.',
    },
    {
      icon: GraduationCap,
      title: 'Eğitim koçları',
      desc: 'Koçluk akışını sistemli hale getirmek isteyenler için.',
    },
    {
      icon: BookOpen,
      title: 'Özel ders verenler',
      desc: 'Birebir ilerlemeyi net görmek isteyen öğretmenler için.',
    },
    {
      icon: Award,
      title: 'Kurs merkezi eğitmenleri',
      desc: 'Kurumsal görünüm ve düzen isteyen eğitim yapıları için.',
    },
    {
      icon: Target,
      title: 'Süreci profesyonelleştirmek isteyen eğitimciler',
      desc: 'Hazır ve güven veren bir sistem arayanlar için.',
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.whoIsItFor} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-green-500"
          >
            Hedef Kitle
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Kimler İçin <span className="gradient-text-orange">Uygun?</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10">
                <audience.icon className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-display mb-2 font-semibold">{audience.title}</h3>
              <p className="text-sm text-gray-400">{audience.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackground
        image={SECTION_BACKGROUNDS.showcase}
        overlay="linear-gradient(180deg, rgba(5,5,6,0.76) 0%, rgba(5,5,6,0.88) 100%)"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            Güven ve İletişim
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Kararsızsanız Sorun, <span className="gradient-text-orange">Hazırsanız Hemen Başlayın</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mb-12 max-w-2xl text-lg text-gray-300">
            Ürünler hakkında hızlı bilgi almak için WhatsApp'tan ulaşın, markayı yakından görmek için Instagram'ı inceleyin, hazırsanız Shopier üzerinden güvenle satın alın.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-3 px-8 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp'tan Hızlı Bilgi Al
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-3 px-8 py-4 text-lg"
            >
              <Instagram className="h-5 w-5" />
              Instagram'da İncele
            </a>
            <a
              href={SHOPIER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-3 px-8 py-4 text-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              Shopier'den Güvenle Satın Al
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Bu sistemler kimler için uygun?',
      answer:
        'MENTORİX PRO sistemleri; LGS koçları, YKS koçları, İngilizce ve Fransızca öğretmenleri, özel ders verenler, eğitim koçları ve kurs merkezi eğitmenleri için uygundur.',
    },
    {
      question: 'Satın aldıktan sonra nasıl teslim ediliyor?',
      answer:
        'Shopier üzerinden satın alma tamamlandıktan sonra sistem hızlı şekilde tarafınıza teslim edilir ve kullanıma hazır olur.',
    },
    {
      question: 'Kullanımı zor mu?',
      answer:
        'Hayır. Yapı sade, anlaşılır ve öğretmenlerin günlük kullanımı için pratik olacak şekilde hazırlanmıştır.',
    },
    {
      question: 'Google Sheets tabanlı mı?',
      answer:
        'Evet. Sistem Google Sheets tabanlıdır ve düzenli veri yönetimi ile hızlı erişim sağlar.',
    },
    {
      question: 'Shopier üzerinden güvenli ödeme yapılabiliyor mu?',
      answer: 'Evet. Tüm satın alma akışı Shopier üzerinden güvenli ödeme altyapısıyla gerçekleşir.',
    },
    {
      question: 'Destek alabilir miyim?',
      answer:
        'Evet. Satın alma öncesinde ve sonrasında WhatsApp üzerinden bilgi ve yönlendirme alabilirsiniz.',
    },
  ];

  return (
    <section id="faq" className="relative overflow-hidden py-24">
      <SectionBackground image={SECTION_BACKGROUNDS.faq} />

      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-orange-500"
          >
            SSS
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Sık Sorulan <span className="gradient-text-orange">Sorular</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
              >
                <span className="font-display pr-4 font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  {openIndex === i ? (
                    <Minus className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-orange-500" />
                  )}
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 leading-relaxed text-gray-300">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative overflow-hidden py-32">
      <SectionBackground
        image={SECTION_BACKGROUNDS.finalCta}
        overlay="linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.88) 100%)"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <motion.div variants={scaleIn} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <span className="font-medium">Premium Koç Takip Sistemleri</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-glow-white font-display mb-6 text-4xl font-bold md:text-6xl">
            Takibinizi Güçlendirin, <span className="gradient-text-orange">Koçluğunuzu Profesyonelleştirin</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mb-12 max-w-2xl text-xl text-gray-200">
            MENTORİX PRO ile öğrenci yönetimini modern, düzenli ve profesyonel bir sisteme dönüştürün.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={SHOPIER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              Hemen Satın Al
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-3 px-10 py-5 text-lg"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp ile İletişime Geç
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#" className="mb-6 flex items-center gap-3">
              <div className="glass inline-flex rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(249,115,22,0.08)]">
                <img
                  src="/logo.png"
                  alt="MENTORİX PRO logosu"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                MENTORİX <span className="text-orange-500">PRO</span>
              </span>
            </a>
            <p className="mb-6 max-w-md leading-relaxed text-gray-400">
              LGS, YKS, Fransızca ve İngilizce koçları için premium öğrenci takip sistemleri. Koçluk sürecinizi profesyonel bir sisteme dönüştürün.
            </p>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={SHOPIER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
              >
                <ShoppingBag className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display mb-6 font-semibold">Ürünler</h4>
            <ul className="space-y-3">
              {[
                'LGS Koç Takip Sistemi',
                'YKS Koç Takip Sistemi',
                'Fransızca Koç Takip Sistemi',
                'İngilizce Koç Takip Sistemi',
              ].map((product) => (
                <li key={product}>
                  <a
                    href={SHOPIER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-6 font-semibold">Bağlantılar</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={SHOPIER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shopier
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">© 2024 MENTORİX PRO. Tüm hakları saklıdır.</p>
          <p className="text-sm text-gray-500">Premium Koç Takip Sistemleri</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ProductsSection />
      <FeaturesSection />
      <WhySection />
      <PreviewSection />
      <HowItWorksSection />
      <WhoIsItForSection />
      <ContactCTASection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}