# `@h0nio/icons`: аудит готовности к первому npm-релизу

Дата аудита: 2026-08-24

Область проверки: `packages/icons`, его интеграция с pnpm workspace, документацией, корневыми скриптами и CI.

## Итог

Статус: **P0, P1 и подготовительная часть P2 реализованы; пакет готов к отдельному reviewed release change**.

Сама коллекция находится в хорошем техническом состоянии: генератор обрабатывает 3760 иконок, сборка проходит, metadata согласована с модулями и SVG, runtime не имеет production-зависимостей, а индивидуальный импорт действительно оставляет в consumer bundle только выбранную иконку.

До первого релиза остаются только действия самого релиза: зафиксировать текущие изменения, получить чистое дерево, снять `private: true`, опубликовать пакет через краткоживущий токен, проверить registry-версию и создать package-specific tag/GitHub Release.

Версия, лицензии и publication metadata подготовлены для `1.0.0`. `private: true` намеренно сохранён как последний защитный барьер до отдельного release change; выполнять реальную публикацию до его снятия нельзя.

## Статус выполнения P0

| Пункт                  | Статус    | Результат                                                                                                                                                                                                       |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0.1 Лицензия          | Выполнено | Собственный код `@h0nio/icons` распространяется H0N World по MIT; Solar Icons Set от 480 Design распространяется по CC BY 4.0. Добавлены обе лицензии, attribution, описание изменений и package verification.  |
| P0.2 Публичный API     | Выполнено | Root облегчён; полный registry перенесён в `@h0nio/icons/all`; добавлены `IconName` и `@h0nio/icons/types`; raw SVG сохранены для первой версии.                                                                |
| P0.3 Metadata и версия | Выполнено | Установлена версия `1.0.0`, добавлены repository/homepage/bugs/keywords/author/engines/publishConfig, SPDX expression `MIT AND CC-BY-4.0` и fallback-поля. Снятие `private` оставлено для release change.       |
| P0.4 Release gates     | Выполнено | Build очищает `dist`; `prepack` собирает и проверяет пакет; `prepublishOnly` запускает check и tests; verifier сверяет exports, JS/DTS/SVG, содержимое и budgets; P1 добавил полный consumer/size/tarball слой. |

## Статус выполнения P1

| Пункт           | Статус    | Результат                                                                                                                                                              |
| --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1.5 Артефакты  | Выполнено | Literal SVG удалён из declarations; source и declaration maps отключены и запрещены verifier.                                                                          |
| P1.6 Raw SVG    | Выполнено | Raw SVG сохранены как осознанный API; import без `.svg` имеет export types и проверяется TypeScript, bundler и tarball fixtures.                                       |
| P1.7 Tests      | Выполнено | Добавлены runtime, contract, SVG, generated, Node ESM, TypeScript, bundle и установленный tarball tests.                                                               |
| P1.8 CI         | Выполнено | Icons check/test/build/package/consumer/size/tarball gates включены в основной quality job.                                                                            |
| P1.9 Imports    | Выполнено | Maintenance scripts требуют `--source` или `H0N_ICONS_SOURCE_DIR`; отсутствующая внешняя `example` директория больше не подразумевается.                               |
| P1.10 Generated | Выполнено | `generate --check` сравнивает полный контент modules, entries, catalog, names, manifest и обе SVG-копии без записи.                                                    |
| P1.11 SVG       | Выполнено | Исправлен `info.svg`, локальные IDs получают icon prefix, проверяются tags/attributes/refs/colors/viewBox; root presentation сохраняется; добавлен browser smoke-test. |
| P1.12 Naming    | Выполнено | Исторические source identifiers сохранены как канонические; исправленные написания добавляются в search tags через явный exceptions-файл.                              |

## Статус выполнения P2

| Пункт | Статус | Результат |
| --- | --- | --- |
| P2.13 README | Выполнено | Добавлены installation, entry points, runtime/raw SVG, environments, accessibility, styles/naming, licensing, maintenance и ссылки на документацию. |
| P2.14 Architecture и releases | Выполнено | Зафиксированы независимое версионирование, package-specific tags, порядок icons → UI dependency и отдельные prepare/verify/publish инструкции. |
| P2.15 Publishing security | Выполнено решением | Принят ручной flow с краткоживущим токеном вне репозитория; interactive scope checks исключены из аудита, trusted publishing оставлен необязательным будущим улучшением. |

## Что уже работает

- В workspace зарегистрирован пакет `@h0nio/icons`.
- Генерация воспроизводимо создаёт 3760 модулей для 3 стилей и 34 категорий.
- Для каждой иконки существуют JS-модуль, declaration-файл и SVG.
- `sideEffects: false` корректно описывает текущие модули.
- Индивидуальные импорты вида `@h0nio/icons/accessibility-duotone` работают и хорошо tree-shake-ятся.
- `@h0nio/icons/runtime` и `@h0nio/icons/catalog` изолированы в отдельные entry points.
- Все статические export targets из текущего `package.json` существуют после сборки.
- В SVG не найдено `script`, `foreignObject`, внешних `image`/`use`, event-handler attributes или фиксированных цветов внутри body.
- На дату аудита запрос npm registry для `@h0nio/icons` вернул `404 Not Found`: опубликованной версии пакета нет. Интерактивная проверка npm-пользователя и организации намеренно исключена из аудита; maintainer публикует через отдельно создаваемый краткоживущий токен.

## Измеренная база

Значения tarball ниже получены до реализации P0 и сохранены как исходная база. После P1, license notices и полного P2 README verifier фиксирует 11 298 файлов и 9 996 080 байт распакованного содержимого. Icon declarations уменьшились до 551 150 байт, publish maps полностью удалены.

### Содержимое npm tarball

| Метрика                            |                                                          Значение до P0 |
| ---------------------------------- | ----------------------------------------------------------------------: |
| Tarball                            |                                                          3 239 895 байт |
| Файлов в tarball                   |                                                                  18 818 |
| Распакованный `dist`               |                                          13 065 960 байт, 15 056 файлов |
| Публикуемые SVG                    |                                             3 820 821 байт, 3760 файлов |
| Распакованные `dist` + `svg`       |                                                         16 886 781 байт |
| Icon JS без root entries           |                                                          4 271 946 байт |
| Icon declarations без root entries |                                                          4 433 626 байт |
| JS source maps и declaration maps  | 1 739 800 байт только для icon modules; 2 843 584 байт для всего `dist` |

До P1 declaration-файлы почти равнялись JS по размеру, потому что `as const satisfies IconDefinition` переносил полный SVG body в literal type каждой иконки.

### Consumer bundle и стоимость разрешения модулей

Измерение выполнено через esbuild с minification и tree-shaking. Время является ориентиром для сравнения на этой машине. Таблица описывает состояние до разделения root и `all`.

| Импорт                       |         Raw |      Gzip | Прочитано модулей |  Время |
| ---------------------------- | ----------: | --------: | ----------------: | -----: |
| Одна иконка через subpath    |       829 B |     481 B |                 2 |  27 ms |
| Одна named icon из root      |       825 B |     478 B |              3763 | 227 ms |
| `runtime`                    |       561 B |     339 B |                 2 |   5 ms |
| `catalog`                    |   322 212 B |  25 830 B |                 2 |  24 ms |
| Полный root `icons` registry | 3 847 014 B | 790 922 B |              3763 | 297 ms |

Финальный bundle named root-import маленький, но bundler всё равно читает весь граф из 3760 icon modules.

После разделения API native Node ESM import лёгкого root занимает около 2 ms и добавляет около 0.5 MiB RSS. Явный `@h0nio/icons/all` занимает около 1010 ms и добавляет около 66 MiB RSS. Одна named icon из `all` по-прежнему tree-shake-ится до примерно 825 B raw / 478 B gzip, но сборщик читает полный граф; поэтому application code должен использовать индивидуальные subpaths.

## P0 — блокеры первого релиза

### 1. Лицензия и происхождение коллекции

Статус: **выполнено 2026-08-24**.

Зафиксировано следующее происхождение и распределение прав:

- SVG получены напрямую из оригинального Figma-ресурса Solar Icons Set от 480 Design;
- код и подготовленные assets сторонних библиотек-обёрток не использовались;
- собственный runtime, генератор и package code `@h0nio/icons` распространяются H0N World по MIT;
- графика Solar Icons Set создана 480 Design и распространяется по CC BY 4.0;
- лицензии разрешают переработку и коммерческое или некоммерческое распространение при сохранении MIT notice для кода и надлежащей CC BY attribution для графики.

В пакет добавлены `LICENSE`, `LICENSE-THIRD-PARTY`, credits в README и SPDX expression `MIT AND CC-BY-4.0`. Third-party notice содержит ссылку на оригинальный Figma-набор, ссылку на CC BY 4.0 и перечень изменений: переименование, оптимизация, категоризация, преобразование в TypeScript definitions и переупаковка.

Package verifier теперь требует оба notice-файла и точное license expression, а установленный tarball fixture проверяет наличие и ключевое содержимое обеих лицензий. Наличие MIT-лицензии в `packages/ui` по-прежнему не меняет смешанное лицензирование отдельного `@h0nio/icons`.

### 2. Зафиксировать публичную структуру imports до версии 1.0

Статус: **выполнено 2026-08-23**.

До исправления root entry одновременно:

- импортирует все 3760 icon modules;
- экспортирует все named definitions;
- создаёт полный объект `icons`.

Это удобно, но дорого для Node/SSR и замедляет сборщики даже при импорте одной named icon. Изменение root entry после стабильного релиза станет breaking change.

Рекомендуемый контракт:

```text
@h0nio/icons/<name>       одна иконка, основной рекомендуемый путь
@h0nio/icons/runtime      renderIcon и iconToDataUri
@h0nio/icons/catalog      metadata без SVG definitions
@h0nio/icons/all          явно тяжёлый eager registry всех definitions
@h0nio/icons/types        лёгкий type-only entry
@h0nio/icons/svg/<name>   только если raw SVG решено оставить публичным API
```

Root `@h0nio/icons` рекомендуется оставить лёгким: runtime helpers и типы без eager imports всех иконок. Документация, которой нужен полный registry, должна явно использовать `@h0nio/icons/all`. UI-библиотека должна импортировать каждую системную иконку через индивидуальный subpath, а не из root или `all`.

Принятые решения:

- named exports и полный registry доступны только через явный `@h0nio/icons/all`;
- root экспортирует runtime helpers и типы и не импортирует definitions;
- raw SVG subpath сохранён в первой версии и проверяется package verifier;
- документационный каталог переведён на явный импорт из `@h0nio/icons/all`.

### 3. Publication metadata и версия

Статус: **реализовано**.

В исходном `packages/icons/package.json` отсутствовали или требовали решения:

- релизная версия;
- `license`;
- `keywords`;
- `author`;
- `repository` с `directory: packages/icons`;
- `homepage` и `bugs`;
- `publishConfig.access: public`;
- `engines`;
- top-level `types`/`module` fallback для совместимости со старым tooling;
- export `./package.json`, если он должен быть доступен consumers.

Для пакета выбрана версия `1.0.0`. Добавлены publication metadata, `publishConfig.access`, Node engine, top-level fallbacks, export `./package.json` и license expression `MIT AND CC-BY-4.0`.

`private: true` остаётся до отдельного проверенного release change непосредственно перед публикацией.

### 4. Нет автоматического барьера от публикации некорректного пакета

Статус: **базовый барьер реализован**.

Добавлены `clean`, `prepack`, `prepublishOnly`, `verify:package` и `verify:consumer`. `pnpm pack --dry-run --json` теперь всегда выполняет чистую сборку, package verification и Node ESM smoke-test публичных exports.

Очистка ограничена точным путём `packages/icons/dist` и выполняется перед генерацией и TypeScript build. Verifier сравнивает source icon names с JS, DTS и publish SVG, разворачивает wildcard exports и проверяет budgets и whitelist.

Что сделать:

1. Добавить безопасную очистку только `packages/icons/dist` перед сборкой.
2. Добавить `prepack` или эквивалент, который всегда создаёт свежий build.
3. Добавить `prepublishOnly`, запускающий полный check, tests, build, consumer fixtures и package verification.
4. Реализовать `verify:package`, который проверяет:
    - export targets;
    - отсутствие source maps, source, tests и временных файлов;
    - ожидаемые top-level файлы;
    - соответствие icon JS/DTS списку metadata;
    - лимиты tarball, unpacked size и file count.
5. Добавить `publish --dry-run` в release checklist.

## P1 — выполнить до релиза

### 5. Уменьшить declaration-файлы и удалить publish maps

Статус: **выполнено**. Definitions имеют явный `IconDefinition`; maps отключены в production tsconfig и запрещены package verifier. Итоговый объём icon declarations — 551 150 байт.

Генератор должен объявлять definition с публичным типом, не сохраняя SVG body в literal type:

```ts
export const AccessibilityDuotoneIcon: IconDefinition = { ... }
```

Это оставит в `.d.ts` только `IconDefinition`, а полный body будет находиться только в JS.

Для npm-пакета рекомендуется отключить:

```json
{
    "declarationMap": false,
    "sourceMap": false
}
```

Если maps нужны локально, использовать отдельную dev-конфигурацию, но не включать их в `files` tarball.

### 6. Решить, публиковать ли 3760 raw SVG

Статус: **выполнено**. Raw SVG остаются публичным API первой версии. Поддерживается только import без расширения: `@h0nio/icons/svg/<name>`; для него добавлен общий declaration target.

Папка `svg` добавляет 3760 файлов и около 3.82 MB unpacked size. Текущая документация и UI используют JS definitions, а не raw SVG export.

Варианты:

- удалить `svg` из npm `files` и export map — минимальный основной пакет;
- оставить raw SVG как осознанный публичный API;
- в будущем вынести raw assets в отдельный пакет, если появятся реальные consumers.

Если raw SVG остаются, consumer-тест должен проверить точный import syntax. Текущий `./svg/* -> ./svg/*.svg` рассчитан на import без расширения; импорт с `.svg` может разрешиться как `name.svg.svg`.

### 7. Добавить unit, generation и consumer tests

Статус: **выполнено**. Реализована вся перечисленная матрица, включая установку настоящего tarball во временный consumer project.

В `packages/icons` сейчас нет тестов.

Минимальная матрица:

- runtime: escaping, decorative icon, label/title, number/string size, data URI;
- generated contract: уникальные names, допустимые styles/categories/tags, совпадение SVG/JS/DTS;
- SVG safety: разрешённые tags/attributes, отсутствие внешних ссылок и event handlers;
- ссылки `url(#id)` должны иметь существующий локальный `id`;
- Node ESM: root/runtime/catalog/subpath согласно принятому контракту;
- TypeScript consumer fixture: default icon import, named definition, types и catalog;
- Vite/esbuild fixture: одна иконка не подтягивает registry;
- raw SVG fixture, если этот API сохраняется;
- package fixture устанавливает именно собранный tarball, а не workspace source alias.

Для bundle tests нужны стабильные budgets. Начальные пределы следует зафиксировать после оптимизации, ориентируясь на текущий subpath baseline: не более 1 KB raw и 600 B gzip для одной контрольной иконки.

### 8. Включить icons в CI

Статус: **выполнено**. Основной Ubuntu quality job запускает check, tests, build, package, consumer, size и tarball verification.

Текущий `.github/workflows/ui-quality.yml` не запускает icons build/check/tests/package verification. Документация проверяет source alias, но не проверяет публикуемый `dist` и export map.

Добавить в основной quality job:

```bash
pnpm --filter @h0nio/icons check
pnpm --filter @h0nio/icons test
pnpm --filter @h0nio/icons build
pnpm --filter @h0nio/icons verify:package
```

### 9. Исправить или удалить сломанные import-команды

Статус: **выполнено**. Все import scripts получают source через `--source <path>` или `H0N_ICONS_SOURCE_DIR`; path safety работает одинаково на Windows и Unix.

`import:duotone`, `import:solid`, `import:stroke` и `import-examples.mjs` ищут исходники в `<workspace>/example`, которого после переноса нет.

Даже если новые иконки для первой версии не планируются, опубликованная библиотека должна иметь воспроизводимый maintenance workflow. Нужно:

- перенести raw source в явно названную и документированную директорию; или
- принимать source path аргументом/переменной; или
- удалить неиспользуемые команды из публичного maintenance workflow.

Скрипты импорта не должны полагаться на отсутствующую соседнюю директорию.

### 10. Усилить проверку generated artifacts

Статус: **выполнено**. `generate --check` строит ожидаемое содержимое в памяти и сравнивает полный набор generated artifacts без изменения дерева.

Текущий `check-generated.mjs` проверяет списки имён и копию manifest, но не обнаруживает:

- устаревшее содержимое icon modules;
- устаревший `index.ts` или `catalog.ts`;
- устаревшую publish-копию `svg`;
- изменённый SVG body при неизменном имени.

Рекомендуется добавить генератору режим `--check`, который формирует ожидаемые данные в памяти или временной директории и сравнивает каждый generated artifact без изменения рабочего дерева.

### 11. Проверить SVG-инварианты и визуальную целостность

Статус: **выполнено**. Missing clip reference исправлен, IDs префиксуются именем иконки, root presentation переносится в generated body, строгий validator и browser smoke-test добавлены.

Найден конкретный дефект:

- `info.svg` использует `clip-path="url(#clip0_33740_221833)"`, но такого `id` внутри SVG нет.

Ещё три SVG используют короткий `id="a"`. При inline-rendering нескольких SVG повторяющиеся IDs могут конфликтовать; генератор должен либо безопасно префиксовать IDs именем иконки, либо удалять ненужные clip paths.

Также root attributes SVG почти полностью отбрасываются при преобразовании в `IconDefinition`: сохраняются только `viewBox` и body. Нужно валидировать, что визуальный результат не зависит от root `stroke`, `fill`, `stroke-width`, `class`, `color` или других attributes.

Добавить автоматическую SVG-проверку и визуальный smoke-test каталога для светлой/тёмной темы и нескольких размеров.

### 12. Проверить naming до фиксации API

Статус: **выполнено**. Принята политика сохранения source identifiers без дублирующих aliases. Известные написания зафиксированы в `src/naming-exceptions.json`, а исправленные варианты добавляются как поисковые теги.

В коллекции присутствуют имена с историческими или вероятными опечатками, например:

- `align-horizonta-spacing`;
- `archive-down-minimlistic`;
- `card-recive`;
- `condicioner`;
- `clound-cross`;
- `colour-tuneing`;
- `magnifer`;
- `siderbar`;
- `spedometer`.

До стабильного релиза нужно решить: сохраняются ли upstream identifiers как канонические или вводятся исправленные aliases. После `1.0.0` удаление или переименование subpath станет breaking change.

Найдено также 57 пар с полностью одинаковым SVG при разных именах или styles. Это не обязательно ошибка, но пары нужно просмотреть: часть может быть намеренными aliases, часть — неверной style metadata.

## P2 — улучшения документации и release process

### 13. Расширить README пакета

Статус: **выполнено 2026-08-24**.

README должен содержать:

- установку;
- рекомендуемый individual import;
- предупреждение о стоимости `all`;
- runtime и raw SVG примеры;
- ESM/Node/browser support;
- accessibility guidance;
- styles и naming convention;
- лицензию и attribution;
- ссылку на каталог документации.

README содержит все перечисленные разделы, таблицу публичных entry points, прямые ссылки на каталог и usage guide, инструкции maintainer и явное предупреждение о полном module graph у `@h0nio/icons/all`. Корневой README теперь также описывает icons package и его основные workspace-команды.

### 14. Обновить архитектуру и release policy монорепозитория

Статус: **выполнено 2026-08-24**.

Добавить отдельный раздел выпуска `@h0nio/icons` в `RELEASING.md` и определить независимое версионирование пакетов.

Чтобы Git tags UI и icons не конфликтовали, использовать package-specific формат, например:

```text
ui-v1.2.0
icons-v1.0.0
```

`ARCHITECTURE.md` и `RELEASING.md` фиксируют независимое semantic versioning, теги `ui-v<version>` и `icons-v<version>`, package-specific проверки и обязательную публикацию/проверку icons до добавления registry dependency в следующий релиз `@h0nio/ui`. Документация imports синхронизирована с lightweight root, raw SVG, catalog и `all`.

### 15. Рассмотреть trusted publishing и provenance

Статус: **решение зафиксировано 2026-08-24**.

Для ручных релизов принят flow с отдельным краткоживущим npm access token. Токен создаётся непосредственно перед публикацией, передаётся через локальную конфигурацию вне репозитория, не попадает в tracked `.npmrc`, аргументы команд или логи и отзывается либо истекает после registry verification.

Интерактивные `pnpm whoami` и проверки организации не входят в этот аудит, поскольку maintainer использует отдельную процедуру выдачи токена. Trusted publishing и provenance рассмотрены как возможное будущее улучшение, но не являются блокерами первого релиза. Во время P2 реальные publish-команды и credentials не использовались.

## Рекомендуемый порядок работ

### Этап 1. Зафиксировать решения

- [x] Подтвердить лицензию и attribution.
- [x] Выбрать `1.0.0`.
- [x] Утвердить лёгкий root и отдельный `all`.
- [x] Сохранить raw SVG exports для первой версии.
- [x] Утвердить naming/aliases до первого стабильного релиза.

### Этап 2. Перестроить package contract и build

- [x] Разделить lightweight entries, catalog и eager registry.
- [x] Перевести icon declarations на `IconDefinition` без literal SVG body.
- [x] Отключить publish source/declaration maps.
- [x] Добавить clean build.
- [x] Исправить exports и publication metadata, включая license; снятие `private` оставить для release change.
- [x] Исправить maintenance import scripts.

### Этап 3. Добавить quality gates

- [x] Unit tests runtime.
- [x] Полная generated/SVG validation.
- [x] Consumer fixtures для Node, TypeScript и bundler.
- [x] Package-content verifier и базовые size/file budgets.
- [x] CI для icons.
- [x] Visual smoke-test каталога.

### Этап 4. Подготовить релиз

- [x] Добавить LICENSE, notices и полный README.
- [x] Обновить `ARCHITECTURE.md`, `RELEASING.md` и документацию imports.
- [x] Собрать чистый tarball и проверить его установкой во временный consumer project.
- [x] Подтвердить, что build/test/pack не добавляют изменений: снимки текущего `git status` до и после проверок совпадают.
- [ ] Зафиксировать подготовленные изменения и получить чистый `git status` для release commit.
- [ ] Убрать `private` в release change.
- [ ] Опубликовать icons отдельно от UI.
- [ ] Проверить опубликованные subpaths через `pnpm view` и чистую установку.
- [ ] Создать package-specific Git tag и GitHub Release.

## Критерий готовности к npm

Пакет можно считать готовым, когда одновременно выполнены условия:

1. лицензия и право распространения документированы;
2. публичные imports и naming зафиксированы;
3. clean build воспроизводим и не изменяет tracked source;
4. unit, generated, SVG, consumer и package tests проходят в CI;
5. tarball не содержит maps/source/tests и укладывается в утверждённые budgets;
6. импорт одной иконки подтверждён bundle fixture и не включает registry/catalog;
7. full registry доступен только через явно тяжёлый entry или его стоимость явно принята;
8. README, release process и version metadata готовы;
9. dry-run устанавливается в чистый consumer project;
10. способ безопасной публикации зафиксирован; проверка доступа выполняется maintainer через краткоживущий токен вне аудита.

Локальные критерии 1–9 и документационная часть критерия 10 выполнены. Registry-dependent действия могут быть завершены только после release commit и фактической публикации.

## Команды, использованные в аудите

```bash
pnpm --filter @h0nio/icons build
pnpm --filter @h0nio/icons check
pnpm --filter @h0nio/icons pack --dry-run --json
pnpm view @h0nio/icons version --json
```

Дополнительно были выполнены локальные esbuild и Node ESM fixtures для subpath, root, runtime, catalog и полного registry.
