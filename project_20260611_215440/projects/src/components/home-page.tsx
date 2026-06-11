'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Data ─────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '轨迹', href: '#timeline' },
  { label: '联系', href: '#contact' },
];

const METRICS = [
  { label: '代码行数', value: 15000, suffix: '+', color: '#2563eb' },
  { label: '完成项目', value: 12, suffix: '', color: '#0891b2' },
  { label: '技术栈', value: 8, suffix: '', color: '#10b981' },
  { label: '学习课程', value: 30, suffix: '+', color: '#f59e0b' },
];

const SKILL_GROUPS = [
  {
    category: '编程语言',
    color: '#2563eb',
    skills: [
      { name: 'Python', level: 82 },
      { name: 'JavaScript', level: 75 },
      { name: 'SQL', level: 70 },
      { name: 'Java', level: 55 },
    ],
  },
  {
    category: '数据技术',
    color: '#0891b2',
    skills: [
      { name: '数据分析', level: 78 },
      { name: '数据可视化', level: 72 },
      { name: '机器学习', level: 50 },
      { name: 'Hadoop/Spark', level: 45 },
    ],
  },
  {
    category: '工具 & 其他',
    color: '#10b981',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'Linux', level: 65 },
      { name: 'Docker', level: 48 },
      { name: 'Figma', level: 55 },
    ],
  },
];

const TAGS = [
  '数据清洗', '爬虫开发', '可视化大屏', 'ECharts', 'Pandas',
  'NumPy', 'Flask', 'Vue.js', 'Node.js', 'MySQL', 'MongoDB',
  'Tableau', 'Power BI', '正则表达式', 'ETL',
];

const PROJECTS = [
  {
    title: '智慧校园数据大屏',
    desc: '基于 ECharts + Flask 构建的实时校园数据可视化平台，整合学生行为、考勤、成绩等多维数据源',
    tags: ['Python', 'ECharts', 'Flask', 'MySQL'],
    status: '已完成',
    span: 'col-span-2',
    accent: '#2563eb',
  },
  {
    title: '电影评论情感分析',
    desc: '使用 NLP 技术对豆瓣影评进行情感分类，准确率达 87%',
    tags: ['Python', 'NLP', 'Pandas'],
    status: '已完成',
    span: 'col-span-1',
    accent: '#0891b2',
  },
  {
    title: '个人技术博客',
    desc: '基于 Next.js 搭建的静态博客系统，支持 MDX 和暗黑模式',
    tags: ['Next.js', 'TypeScript', 'MDX'],
    status: '进行中',
    span: 'col-span-1',
    accent: '#10b981',
  },
  {
    title: '疫情数据追踪器',
    desc: '实时抓取公开疫情数据并通过交互图表展示趋势变化与区域分布',
    tags: ['Python', '爬虫', 'ECharts'],
    status: '已完成',
    span: 'col-span-1',
    accent: '#f59e0b',
  },
  {
    title: '学生成绩管理系统',
    desc: '基于 Vue + Node.js 的全栈 CRUD 应用，支持导入导出、成绩统计和可视化报表',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    status: '已完成',
    span: 'col-span-2',
    accent: '#2563eb',
  },
];

const TIMELINE = [
  {
    date: '2023.09',
    title: '入学昆明学院',
    desc: '数据科学与大数据技术专业，开始系统学习编程与数学基础',
  },
  {
    date: '2024.03',
    title: 'Python 数据分析入门',
    desc: '掌握 Pandas、NumPy，完成第一个数据清洗项目',
  },
  {
    date: '2024.09',
    title: '可视化 & 全栈实践',
    desc: '学习 ECharts、Flask，搭建数据可视化大屏；同时接触前端 Vue.js',
  },
  {
    date: '2025.01',
    title: '项目积累 & 技术拓展',
    desc: '完成多个课程项目，涉足爬虫、NLP、Docker 等领域',
  },
  {
    date: '2025.06',
    title: '个人主页上线',
    desc: '整合所学，打造属于自己的技术展示空间',
  },
];

/* ─── Hooks ────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1200, decimal = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(ease * target);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return decimal ? value.toFixed(1) : Math.round(value);
}

/* ─── Sub-components ───────────────────────────────────── */

function RingChart({ value, size = 80, color, label, suffix }: {
  value: number; size?: number; color: string; label: string; suffix: string;
}) {
  const { ref, visible } = useInView(0.3);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={visible ? circ - filled : circ}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        />
      </svg>
      <span className="text-xs font-mono text-slate-500">{label}</span>
    </div>
  );
}

function MetricCard({ label, value, suffix, color, decimal }: {
  label: string; value: number; suffix: string; color: string; decimal?: boolean;
}) {
  const { ref, visible } = useInView(0.3);
  const displayed = useCountUp(value, visible, 1400, decimal);
  return (
    <div ref={ref} className="text-center px-6 py-4">
      <div className="font-mono text-3xl font-bold tracking-tight" style={{ color }}>
        {displayed}{suffix}
      </div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
      <span className="w-5 h-px bg-slate-300" />
      {children}
    </span>
  );
}

/* ─── Navigation ───────────────────────────────────────── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono font-bold text-lg text-slate-800 tracking-tight">
          Xiu<span className="text-blue-600">Yudong</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pb-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-slate-600 hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    type Point = { x: number; y: number; vx: number; vy: number };
    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const points: Point[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w()) p.vx *= -1;
        if (p.y < 0 || p.y > h()) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,0.25)';
        ctx.fill();
      });
      // Draw subtle connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-14">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left: Text */}
          <div className="md:col-span-3">
            <p className="font-mono text-sm text-blue-600 mb-4">{'>'} Hello, World!</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              修宇峒
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light mt-3">
              数据科学 & 全栈开发
            </p>
            <p className="text-slate-500 mt-6 max-w-lg leading-relaxed">
              昆明学院 · 数据科学与大数据技术专业在读。用数据理解世界，用代码构建工具——在分析中找规律，在工程中求落地。
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="#about"
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                了解更多
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                联系我
              </a>
            </div>
          </div>

          {/* Right: Mini dashboard */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400">SKILL_PROFILE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <RingChart value={75} size={72} color="#2563eb" label="编程" suffix="%" />
                <RingChart value={70} size={72} color="#0891b2" label="数据" suffix="%" />
                <RingChart value={60} size={72} color="#10b981" label="工程" suffix="%" />
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">ACTIVITY</span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 30, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: `rgba(37,99,235,${0.2 + (h / 100) * 0.6})`,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2 font-mono">12 months contribution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────── */

function AboutSection() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="py-24 bg-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}>
        <SectionLabel>关于我</SectionLabel>
        <div className="grid md:grid-cols-5 gap-12">
          {/* Left: narrative */}
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              友善、负责、务实——<br />用数据说话的人
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                我是修宇峒，2005 年生，昆明学院数据科学与大数据技术专业 2023 级本科生。
                性格沉稳踏实，善于独立思考，对细节有较强的记忆力。我相信做事要有原则，学习要靠项目驱动。
              </p>
              <p>
                专业方向覆盖数据分析、可视化和全栈开发。日常使用 Python 做数据清洗和分析，
                用 ECharts 搭建可视化大屏，也在探索 Vue.js 和 Node.js 构建完整的 Web 应用。
              </p>
              <p>
                课余喜欢音乐和艺术创作，形象思维强，这也让我在做可视化时更有直觉。我的目标是成为一名能独立完成数据全链路工作的工程师。
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { k: '学校', v: '昆明学院' },
                { k: '专业', v: '数据科学与大数据技术' },
                { k: '年级', v: '2023 级本科' },
                { k: '方向', v: '数据分析 · 全栈开发' },
              ].map((f) => (
                <div key={f.k} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                  <span className="text-sm text-slate-400">{f.k}</span>
                  <span className="text-sm font-medium text-slate-700">{f.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: metrics */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <p className="text-xs font-mono text-slate-400 mb-5">KEY_METRICS</p>
              <div className="grid grid-cols-2 gap-4">
                {METRICS.map((m) => (
                  <MetricCard key={m.label} {...m} />
                ))}
              </div>
            </div>
            {/* Tags */}
            <div className="mt-6">
              <p className="text-xs font-mono text-slate-400 mb-3">TRAITS</p>
              <div className="flex flex-wrap gap-2">
                {['务实', '认真', '善于思考', '忠于职守', '有同情心', '艺术直觉'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ───────────────────────────────────────────── */

function SkillsSection() {
  const { ref, visible } = useInView();

  return (
    <section id="skills" className="py-24 grid-bg">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}>
        <SectionLabel>技能矩阵</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          工具是手段，解决问题才是目的
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-3 h-3 rounded-full" style={{ background: group.color }} />
                <h3 className="font-semibold text-slate-800">{group.category}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{skill.name}</span>
                        <span className="font-mono text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: visible ? `${skill.level}%` : '0%',
                            background: group.color,
                          }}
                        />
                      </div>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="mt-10">
          <p className="text-xs font-mono text-slate-400 mb-4">TECH_STACK</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="tag-item px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-500 rounded-md cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ─────────────────────────────────────────── */

function ProjectsSection() {
  const { ref, visible } = useInView();

  return (
    <section id="projects" className="py-24 bg-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}>
        <SectionLabel>项目中心</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          项目是最好的学习方式
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className={`${p.span} group bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: `${p.accent}12`,
                    color: p.accent,
                  }}
                >
                  {p.status}
                </span>
                <svg
                  className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 bg-slate-50 text-slate-500 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ─────────────────────────────────────────── */

function TimelineSection() {
  const { ref, visible } = useInView();

  return (
    <section id="timeline" className="py-24 grid-bg">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}>
        <SectionLabel>成长轨迹</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          一步一个脚印
        </h2>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />

          {TIMELINE.map((item, i) => (
            <div key={item.date} className="relative pl-10 pb-10 last:pb-0">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 transition-all duration-500 ${
                  visible ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="absolute inset-[3px] rounded-full bg-white" />
              </div>

              <div
                className={`transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 150 + 100}ms` }}
              >
                <span className="font-mono text-xs text-blue-600">{item.date}</span>
                <h4 className="font-semibold text-slate-800 mt-1">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────── */

function ContactSection() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" className="py-24 bg-white">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}>
        <SectionLabel>联系方式</SectionLabel>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            随时欢迎交流
          </h2>
          <p className="text-slate-500 mb-8">
            无论是项目合作、技术讨论还是学习交流，都可以通过以下方式联系我
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '✉', label: '邮箱', value: '2630056829@qq.com' },
              { icon: '📱', label: '电话', value: '156-3560-6658' },
              { icon: '📍', label: '位置', value: '云南 · 昆明' },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-slate-50 rounded-lg p-5 border border-slate-100"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <p className="text-xs font-mono text-slate-400 mb-1">{c.label}</p>
                <p className="text-sm font-medium text-slate-700">{c.value}</p>
              </div>
            ))}
          </div>

          <a
            href="mailto:2630056829@qq.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            发送邮件
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-slate-400">
          Xiu<span className="text-blue-600">Yudong</span> · 2025
        </span>
        <p className="text-xs text-slate-400">
          用数据理解世界，用代码构建工具
        </p>
      </div>
    </footer>
  );
}

/* ─── Main Page ────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-slate-800">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
