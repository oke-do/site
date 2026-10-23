# Кадры · модели

Одностраничный сайт: «Лизинг, аутстаффинг и аутсорсинг персонала: опыт и проблемы использования».
Стек прежний: Vite + React + TypeScript + Tailwind 3 + Lenis + lucide-react.

    npm install
    npm run dev       # разработка
    npm run build     # tsc + vite build

Структура `src/`:
- `data.ts` — тексты трёх моделей (заголовки, статусы, подписи на схеме)
- `components/ScrollyHero.tsx` — pinned-секция: схема меняется по скроллу (Введение → Аутсорсинг → Аутстаффинг → Лизинг → Итог)
- `components/Diagram.tsx` — SVG-схема «Заказчик — Провайдер — Работники»
- `components/StaticHero.tsx` — вариант без анимации (prefers-reduced-motion)
- `Compare`, `Law`, `World`, `Problems`, `Picker`, `Footer` — остальные секции

Видео из старой версии (intro.mp4, 1.mp4, 2.mp4, scrub.mp4, intro_loop.mp4) не используются.
