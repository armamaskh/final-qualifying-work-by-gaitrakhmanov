import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const FontFamilyControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontFamily"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Шрифт:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Monospace">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const FontSizeControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontSize"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Aa:</FormLabel>
        <FormControl>
          <Input
            {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            type="number"
            min="1"
            max="120"
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const OptionFontSizeControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="optionFontSize"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Размер выбранной ячейки:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="number"
            min={1}
            max={120}
            placeholder="12"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            onChange={(e) => field.onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const OptionFontFamilyControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="optionFontFamily"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Шрифт выбранной ячейки:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'Helvetica'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent className="!w-[140px]">
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const TextOverflowControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="textOverflow"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Видимость текста в блоке:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'clip'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select overflow" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="clip">Clip</SelectItem>
              <SelectItem value="ellipsis">Ellipsis</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const DropdownIconControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="dropdownIcon"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Dropdown Icon:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'chevron'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent className="!w-[140px]">
              <SelectItem value="chevron">Chevron</SelectItem>
              <SelectItem value="caret">Caret</SelectItem>
              <SelectItem value="arrow">Arrow</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const FontWeightControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontWeight"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Жирность:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="100">Thin</SelectItem>
              <SelectItem value="200">Extra Light</SelectItem>
              <SelectItem value="300">Light</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="500">Medium</SelectItem>
              <SelectItem value="600">Semi Bold</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="800">Extra Bold</SelectItem>
              <SelectItem value="900">Black</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const FontStyleControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontStyle"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Стиль:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="italic">Italic</SelectItem>
              <SelectItem value="oblique">Oblique</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const LetterSpacingControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="letterSpacing"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Интервал (м/б):</FormLabel>
        <FormControl>
          <Input
            {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-20 text-xs text-center "
            placeholder="1px"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);

export const TextDecorationControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="textDecoration"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Оформление:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select decoration" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="underline">Underline</SelectItem>
              <SelectItem value="line-through">Line-through</SelectItem>
              <SelectItem value="overline">Overline</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const ColorControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="color"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        {/* <FormLabel>Цвет:</FormLabel> */}
        <FormControl>
          <Input
            {...field}
            type="color"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-10 px-0 py-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);


export const TextAlignControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="textAlign"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Выравнивание:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="justify">Justify</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const PaddingControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="padding"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Внутр. Отступы, px:</FormLabel>
        <FormControl>
          <Input {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            type="number" min="1" max="120"
            value={parseFloat(field.value) || ""}
            placeholder="4px"
            onChange={(e) =>
              field.onChange((e.target.value) ? `${e.target.value}px` : "")}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);


export const MarginControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="margin"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Margin:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="0px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-16 pl-2 pr-0 py-0 text-xs text-center"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);


export const MarginTopControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="marginTop"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>🞁</FormLabel>
        <FormControl>
          <Input
            {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-15 text-center text-xs"
            placeholder="4px"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const MarginBottomControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="marginBottom"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>🞃</FormLabel>
        <FormControl>
          <Input
            {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-15 text-center text-xs"
            placeholder="4px"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const MarginRightControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="marginRight"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel> 🞂</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="4px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-17 text-center text-xs"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const MarginLeftControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="marginLeft"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>🞀</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="4px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-15 text-center text-xs"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const BorderControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="border"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Рамка:</FormLabel>
        <FormControl>

          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select border" />
            </SelectTrigger>
            <SelectContent className="!w-[160px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="0.1px solid #000000">black, 0.1px</SelectItem>
              <SelectItem value="0.5px solid #000000">black, 0.5px</SelectItem>
              <SelectItem value="1px solid #000000">black, 1px</SelectItem>
              <SelectItem value="1px dashed var(--foreground)">dashed,foreground, 1px</SelectItem>
              <SelectItem value="2px dashed var(--foreground)">dashed,foreground, 2px</SelectItem>
              <SelectItem value="0.5px dashed var(--foreground)">dashed,foreground, 0.5px</SelectItem>
              <SelectItem value="2px solid #000000">black, 2px</SelectItem>
              <SelectItem value="3px solid #000000">black, 3px</SelectItem>
              <SelectItem value="4px solid #000000">black, 4px</SelectItem>
              <SelectItem value="5px solid #000000">black, 5px</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const BackgroundColorControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="backgroundColor"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Фон:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="color"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-5 px-0 py-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const HeightControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="height"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Высота, px:</FormLabel>
        <FormControl>
          <Input {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            type="number" min="1" max="500"
            value={parseFloat(field.value) || ""}
            placeholder="20px"
            onChange={(e) =>
              field.onChange((e.target.value) ? `${e.target.value}px` : "")}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>)} />
);


export const WidthControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="width"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Ширина, px:</FormLabel>
        <FormControl>
          <Input {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            type="number" min="1" max="5000"
            value={parseInt(field.value) || ""}
            placeholder="100px"
            onChange={(e) =>
              field.onChange((e.target.value) ? `${e.target.value}px` : "")}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);




export const LineHeightControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="lineHeight"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Интервал (м/стр):</FormLabel>
        <FormControl>
          <Input
            {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 py-0 text-xs text-center"
            type="text"
            placeholder="1.2"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const ColumnSpanControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="columnSpan"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Колоночная верстка:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select span" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const TextTransformControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="textTransform"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Регистр:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select transform" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="uppercase">Uppercase</SelectItem>
              <SelectItem value="lowercase">Lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const FontVariantControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontVariant"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Варианты шрифта:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || ''}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent className="!w-[300px] max-h-[300px] overflow-auto">
              {/* Основные варианты */}
              <SelectItem value="none">Нет</SelectItem>
              <SelectItem value="normal">Обычный</SelectItem>

              {/* Капители */}
              <SelectItem value="small-caps">Малые прописные</SelectItem>
              <SelectItem value="all-small-caps">Все малые прописные</SelectItem>
              <SelectItem value="petite-caps">Уменьшенные капители</SelectItem>
              <SelectItem value="all-petite-caps">Все уменьшенные капители</SelectItem>
              <SelectItem value="unicase">Уникальный регистр</SelectItem>
              <SelectItem value="titling-caps">Титульные капители</SelectItem>

              {/* Лигатуры */}
              <SelectItem value="common-ligatures">Стандартные лигатуры</SelectItem>
              <SelectItem value="no-common-ligatures">Без стандартных лигатур</SelectItem>
              <SelectItem value="discretionary-ligatures">Дополнительные лигатуры</SelectItem>
              <SelectItem value="no-discretionary-ligatures">Без дополнительных лигатур</SelectItem>
              <SelectItem value="historical-ligatures">Исторические лигатуры</SelectItem>
              <SelectItem value="no-historical-ligatures">Без исторических лигатур</SelectItem>
              <SelectItem value="contextual">Контекстные</SelectItem>
              <SelectItem value="no-contextual">Без контекстных</SelectItem>

              {/* Стилистические наборы (1-20) */}
              {[...Array(20)].map((_, i) => (
                <SelectItem key={`styleset-${i + 1}`} value={`styleset(${i + 1})`}>
                  {`Стилистический набор ${i + 1}`}
                </SelectItem>
              ))}

              {/* Другие популярные опции */}
              <SelectItem value="historical-forms">Исторические формы</SelectItem>
              <SelectItem value="swash(1)">Свисающие элементы 1</SelectItem>
              <SelectItem value="swash(2)">Свисающие элементы 2</SelectItem>
              <SelectItem value="ornaments(1)">Орнаменты 1</SelectItem>
              <SelectItem value="ornaments(2)">Орнаменты 2</SelectItem>
              <SelectItem value="annotation(1)">Аннотации 1</SelectItem>

              {/* Числовые стили */}
              <SelectItem value="lining-nums">Выстрочные цифры</SelectItem>
              <SelectItem value="oldstyle-nums">Старостильные цифры</SelectItem>
              <SelectItem value="proportional-nums">Пропорциональные цифры</SelectItem>
              <SelectItem value="tabular-nums">Табличные цифры</SelectItem>
              <SelectItem value="diagonal-fractions">Диагональные дроби</SelectItem>
              <SelectItem value="stacked-fractions">Вертикальные дроби</SelectItem>

              {/* Прочие */}
              <SelectItem value="ordinal">Порядковые</SelectItem>
              <SelectItem value="slashed-zero">Ноль с чертой</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const TextIndentControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="textIndent"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Красная строка:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="20px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-20 py-0 text-xs text-center"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export const ColumnsControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="columns"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Колонны:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="number"
            min={1}
            max={10}
            placeholder="1"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-10 pl-2 pr-0 py-0 text-xs"
            onChange={(e) => field.onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);


export const ColumnGapControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="columnGap"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Отступы:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="20px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 py-0 text-xs text-center"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);



export const HyphenationControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="hyphens"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Расстановка переносов:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'none'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="!w-[100px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const OverflowWrapControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="overflowWrap"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Поведение при переполнении:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'normal'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="!w-[140px]">
              <SelectItem value="normal">Обычный</SelectItem> 
              <SelectItem value="break-word">Переносить слово</SelectItem>
              <SelectItem value="anywhere">Переносить где угодно</SelectItem>
              <SelectItem value="inherit">Наследовать</SelectItem>
              <SelectItem value="revert">Вернуть</SelectItem>
              <SelectItem value="initial">Исходный</SelectItem>
              <SelectItem value="unset">Сбросить</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const WhiteSpaceControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="whiteSpace"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Обработка пробелов:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'normal'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="!w-[140px]">
              <SelectItem value="normal">Обычный</SelectItem>
              <SelectItem value="nowrap">Без переноса</SelectItem>
              <SelectItem value="pre">Сохранить</SelectItem>
              <SelectItem value="pre-wrap">Сохранить с переносом</SelectItem>
              <SelectItem value="pre-line">Сохранить строки</SelectItem>
              <SelectItem value="break-spaces">Разрывать пробелы</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const WordSpacingControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="wordSpacing"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Интервал (м/с):</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="normal or 5px"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-22 py-0 text-xs text-center"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);



export const LineBreakControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="lineBreak"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Перенос строки:</FormLabel>
        <FormControl>
          <Select {...field} onValueChange={field.onChange} value={field.value || 'auto'}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select line break" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="strict">Strict</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const BorderStyleControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="borderStyle"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Стиль рамки:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'solid'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="!w-[100px]">
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const BorderColorControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="borderColor"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Цвет рамки:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="color"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-5 px-0 py-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);

export const BorderWidthControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="borderWidth"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Толщина</FormLabel>
        <FormControl>
          <Input {...field}
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            type="number" min="1" max="5000"
            value={parseInt(field.value) || ""}
            placeholder="1px"
            onChange={(e) =>
              field.onChange((e.target.value) ? `${e.target.value}px` : "")}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }} />
        </FormControl>
      </FormItem>
    )}
  />
);

export const OpacityControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="opacity"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Прозрачность:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="number"
            min={0}
            max={1}
            step={0.1}
            placeholder="1"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            onChange={(e) => field.onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);


export const FontVariantNumericControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="fontVariantNumeric"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Варианты шрифта:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'lining-nums'}>
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="!w-[140px]">
              <SelectItem value="lining-nums">Lining Numbers</SelectItem>
              <SelectItem value="oldstyle-nums">Oldstyle Numbers</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);


export const DecimalPlacesControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="decimalPlaces"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Число знаков после запятой:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="number"
            min={0}
            max={10}
            placeholder="2"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
            onChange={(e) => field.onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);



export const NumberFormatControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="numberFormat"
    render={({ field }) => (
      <FormItem className="flex items-center ">
        <FormLabel>Формат:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'ru-RU'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="ru-RU">Russian</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
              <SelectItem value="de-DE">German</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
              <SelectItem value="ja-JP">Japanese</SelectItem>
              <SelectItem value="zh-CN">Chinese</SelectItem>
              <SelectItem value="ar-EG">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);












export const LocaleControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="locale"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Локализация:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || 'ru-RU'}
          >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="ru-RU">Russian</SelectItem>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="de-DE">German</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
              <SelectItem value="es-ES">Spanish</SelectItem>
              <SelectItem value="zh-CN">Chinese</SelectItem>
              <SelectItem value="ja-JP">Japanese</SelectItem>
              <SelectItem value="it-IT">Italian</SelectItem>
              <SelectItem value="pt-BR">Portuguese (Brazil)</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>)} />
);

export const DateFormatControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="dateFormat"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Формат даты:</FormLabel>
        <FormControl>
          <Select
            {...field}
            onValueChange={field.onChange}
            value={field.value || ""} >
            <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="!w-[120px]">
              <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="MMMM D, YYYY">MMMM D, YYYY</SelectItem>
              <SelectItem value="D MMMM YYYY">D MMMM YYYY</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export const CalendarIconControl = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="calendarIcon"
    render={({ field }) => (
      <FormItem className="flex items-center">
        <FormLabel>Calendar Icon:</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder="16px right"
            className="bg-foreground/5 rounded-[8px] !h-[20px] w-28 py-0 px-2 text-xs"
            onChange={(e) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
