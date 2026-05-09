# Build on Base — NFT Mint App

## Что это
Мини-апп для минтинга NFT на Base. Задеплоенный на Vercel, регистрируется на base.dev как твоё приложение.

---

## Шаг 1 — Задеплой на Vercel

1. Загрузи эту папку на GitHub (новый репозиторий)
2. Зайди на [vercel.com](https://vercel.com) → New Project → импортируй репо
3. Vercel автоматически определит Next.js — жми Deploy
4. Получишь домен типа `build-on-base.vercel.app`

---

## Шаг 2 — Добавь домен на base.dev

1. Зайди на [base.dev](https://base.dev) → Settings → Builder Codes
2. Нажми "+ Add"
3. Введи домен с Vercel (например `build-on-base.vercel.app`)
4. base:app_id уже вшит в код (`69ff8e719ee68cd142d1af9a`) — верификация пройдёт автоматически
5. Получишь Builder Code вида `bc_xxxxxxxx`

---

## Шаг 3 — Задеплой NFT контракт

Самый простой способ — через [thirdweb.com](https://thirdweb.com/explore/nft-collection):
1. Выбери "NFT Collection (ERC-721)"
2. Сеть: Base mainnet
3. Заполни название "Build on Base", символ "BOB"
4. Установи цену 0.00001 ETH
5. Скопируй адрес контракта

---

## Шаг 4 — Обнови config.ts

Открой файл `app/config.ts` и замени:

```ts
export const BUILDER_CODE = 'bc_xxxxxxxx'  // ← твой Builder Code
export const NFT_CONTRACT_ADDRESS = '0x...'  // ← адрес контракта
```

Потом сделай git push — Vercel автоматически обновит сайт.

---

## Шаг 5 — Поделись в Farcaster

Опубликуй каст со ссылкой на твой Vercel URL.
Люди будут минтить → транзакции атрибутируются тебе → Base видит тебя как билдера.

---

## Структура проекта

```
app/
  layout.tsx     — meta tag base:app_id (уже вшит)
  page.tsx       — главная страница с минтом
  config.ts      — ← ЗАМЕНИ builder code и адрес контракта
  abi.ts         — ABI контракта
  providers.tsx  — wagmi провайдер
  globals.css    — стили
```
