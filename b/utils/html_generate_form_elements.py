import json
from typing import Callable, Dict, Optional
from core.models import Form, FormSubmission




def generate_text_field_html(element: Dict, value: str) -> str:
   styles = element['styleConfig']
   css = ( f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
           f"font-size: {styles.get('fontSize', 12)}px; "
           f"font-weight: {styles.get('fontWeight', 'normal')}; "
           f"font-style: {styles.get('fontStyle', 'normal')}; "
           f"color: {styles.get('color', '#000000')}; "
           f"text-align: {styles.get('textAlign', 'left')}; "
           f"height: {styles.get('height', 'auto')}; "
           f"border: {styles.get('border', 'none')}; "
           f"background-color: {styles.get('backgroundColor', '#FFFFFF')}; "
           f"padding: {styles.get('padding', '0')}; "
           f"margin-top: {styles.get('marginTop', '0')}; "
           f"margin-bottom: {styles.get('marginBottom', '0')}; "
           f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
           f"text-decoration: {styles.get('textDecoration', 'none')};" )
   return f'''<div style="{css}">
               {value or element["extraAttributes"].get("placeHolder", "")}
            </div>'''


def generate_date_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    css = (
        f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"height: {styles.get('height', '20px')}; "
        f"border: {styles.get('border', 'none')}; "
        f"background-color: {styles.get('backgroundColor', '#f0f0f0').replace('var(--muted)', '#f0f0f0')}; "
        f"padding: {styles.get('padding', '4px')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
        f"text-decoration: {styles.get('textDecoration', 'none')};"
    )
    return f'<div style="{css}">{value}</div>'


def generate_image_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    css = (
        f"border-style: {styles.get('borderStyle', 'dashed')}; "
        f"border-width: {styles.get('borderWidth', '2px')}; "
        f"border-color: {styles.get('borderColor', '#000000').replace('var(--foreground)', '#000000')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom succeeds: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"padding: {styles.get('padding', '16px')}; "
        f"height: {styles.get('height', '100px')}; "
        f"width: {styles.get('width', '100%')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"object-fit: contain;"
    )
    return f'<img src="{value}" style="{css}" />' if value else f'<div style="{css}">{element.get("extraAttributes", {}).get("placeHolder", "")}</div>'
    
    
    return f'<img src="{value}" style="{css}" />'


def generate_number_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = value or element.get('extraAttributes', {}).get('placeHolder', '')
    css = (
        f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'right')}; "
        f"height: {styles.get('height', '20px')}; "
        f"border: {styles.get('border', 'none')}; "
        f"background-color: {styles.get('backgroundColor', '#FFFFFF')}; "
        f"padding: {styles.get('padding', '4px')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
        f"text-decoration: {styles.get('textDecoration', 'none')}; "
        f"font-variant-numeric: {styles.get('fontVariantNumeric', 'normal')};"
    )
    return f'<div style="{css}">{value}</div>'


def generate_paragraph_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = value or element.get('extraAttributes', {}).get('text', 'Текст параграфа по умолчанию')
    css = (
        f"font-family: {styles.get('fontFamily', 'Times New Roman')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'justify')}; "
        f"line-height: {styles.get('lineHeight', '1.6')}; "
        f"text-indent: {styles.get('textIndent', '0px')}; "
        f"margin-top: {styles.get('marginTop', '8px')}; "
        f"margin-bottom: {styles.get('marginBottom', '8px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"word-spacing: {styles.get('wordSpacing', 'normal')}; "
        f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
        f"column-count: {styles.get('columns', 1)}; "
        f"column-gap: {styles.get('columnGap', '20px')}; "
        f"hyphens: {styles.get('hyphens', 'auto')}; "
        f"overflow-wrap: {styles.get('overflowWrap', 'break-word')}; "
        f"white-space: {styles.get('whiteSpace', 'normal')}; "
        f"background-color: {styles.get('backgroundColor', '#FFFFFF')}; "
        f"line-break: {styles.get('lineBreak', 'auto')};" )
    return f'<p style="{css}">{value}</p>'

def generate_separator_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    css = (
        f"height: {styles.get('height', '1px')}; "
        f"width: {styles.get('width', '100%')}; "
        f"background-color: {styles.get('backgroundColor', '#000000').replace('var(--foreground)', '#000000')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"border-style: {styles.get('borderStyle', 'solid')}; "
        f"border-color: {styles.get('borderColor', '#CCCCCC')}; "
        f"border-width: {styles.get('borderWidth', '1px')}; "
        f"opacity: {styles.get('opacity', 1)};"
    )
    return f'<hr style="{css}" />'

def generate_spacer_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    height = element.get('extraAttributes', {}).get('height', '20px')
    css = (
        f"height: {height}px; "
        f"width: {styles.get('width', '100%')}; "
        f"background-color: {styles.get('backgroundColor', 'transparent')}; "
        f"margin-top: {styles.get('marginTop', '0px')}; "
        f"margin-bottom: {styles.get('marginBottom', '0px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')};"
    )
    return f'<div style="{css}"></div>'


def generate_subtitle_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = value or element.get('extraAttributes', {}).get('title', 'Подзаголовок по умолчанию')
    css = (
        f"font-family: {styles.get('fontFamily', 'Times New Roman')}; "
        f"font-size: {styles.get('fontSize', 18)}px; "
        f"font-weight: {styles.get('fontWeight', '500')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"line-height: {styles.get('lineHeight', '1.4')}; "
        f"margin-top: {styles.get('marginTop', '6px')}; "
        f"margin-bottom: {styles.get('marginBottom', '6px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"text-transform: {styles.get('textTransform', 'none')}; "
        f"font-variant: {styles.get('fontVariant', 'normal')};"
    )
    return f'<h2 style="{css}">{value}</h2>'

def generate_table_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    table_data = json.loads(value) if value else []
    headers = element.get('extraAttributes', {}).get('headers', [])
    table_style = (
        f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"border: {styles.get('border', '1px solid #000000').replace('var(--border)', '#000000')}; "
        f"background-color: {styles.get('backgroundColor', '#FFFFFF').replace('var(--background)', '#FFFFFF')}; "
        f"padding: {styles.get('padding', '4px')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"border-collapse: collapse; "
        f"width: 100%;"
    )
    th_style = (
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"border: {styles.get('border', '1px solid #000000').replace('var(--border)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"padding: {styles.get('padding', '4px')};"
    )
    td_style = (
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"border: {styles.get('border', '1px solid #000000').replace('var(--border)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"padding: {styles.get('padding', '4px')};"
    )
    headers_html = ''.join(f'<th style="{th_style}">{header}</th>' for header in headers)
    rows_html = ''.join(
        '<tr>' + ''.join(f'<td style="{td_style}">{row.get(header, "")}</td>' for header in headers) + '</tr>'
        for row in table_data
    )
    return f'''
    <table style="{table_style}">
        <thead>
            <tr>{headers_html}</tr>
        </thead>
        <tbody>{rows_html}</tbody>
    </table>
    '''

def generate_textarea_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = value or element.get('extraAttributes', {}).get('placeHolder', '')
    css = (
        f"font-family: {styles.get('fontFamily', 'monospace')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"line-height: {styles.get('lineHeight', '1.5')}; "
        f"text-indent: {styles.get('textIndent', '0px')}; "
        f"margin-top: {styles.get('marginTop', '0px')}; "
        f"margin-bottom: {styles.get('marginBottom', '0px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"word-spacing: {styles.get('wordSpacing', 'normal')}; "
        f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
        f"column-count: {styles.get('columns', 1)}; "
        f"column-gap: {styles.get('columnGap', '12px')}; "
        f"hyphens: {styles.get('hyphens', 'none')}; "
        f"background-color: {styles.get('backgroundColor', '#f0f0f0').replace('var(--muted)', '#f0f0f0')}; "
        f"padding: {styles.get('padding', '8px')}; "
        f"border: {styles.get('border', '1px solid #cccccc')}; "
        f"white-space: {styles.get('whiteSpace', 'pre-wrap')}; "
        f"overflow-wrap: {styles.get('overflowWrap', 'break-word')}; "
        f"line-break: {styles.get('lineBreak', 'auto')};"
    )
    return f'<div style="{css}">{value}</div>'


def generate_text_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = value or element.get('extraAttributes', {}).get('placeHolder', '')
    css = (
        f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"height: {styles.get('height', 'auto')}; "
        f"border: {styles.get('border', 'none')}; "
        f"background-color: {styles.get('backgroundColor', '#f0f0f0').replace('var(--muted)', '#f0f0f0')}; "
        f"padding: {styles.get('padding', '4px')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"letter-spacing: {styles.get('letterSpacing', 'normal')}; "
        f"text-decoration: {styles.get('textDecoration', 'none')};"
    )
    return f'<div style="{css}">{value}</div>'


def generate_title_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    value = (value or   element.get('extraAttributes', {}).get('title', '') or
                        "Заголовок по умолчанию")
    
    css = (
        f"font-family: {styles.get('fontFamily', 'Times New Roman')}; "
        f"font-size: {styles.get('fontSize', 24)}px; "
        f"font-weight: {styles.get('fontWeight', 'bold')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'center')}; "
        f"line-height: {styles.get('lineHeight', '1.2')}; "
        f"margin-top: {styles.get('marginTop', '8px')}; "
        f"margin-bottom: {styles.get('marginBottom', '12px')}; "
        f"text-transform: {styles.get('textTransform', 'none')}; "
        f"letter-spacing: {styles.get('letterSpacing', '0.5px')}; "
        f"text-decoration: {styles.get('textDecoration', 'none')};"
    )
    return f'''<h1 style="{css}">
                  {value}
               </h1>'''



def generate_select_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    css = (
        f"font-family: {styles.get('fontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('fontSize', 12)}px; "
        f"font-weight: {styles.get('fontWeight', 'normal')}; "
        f"font-style: {styles.get('fontStyle', 'normal')}; "
        f"color: {styles.get('color', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('textAlign', 'left')}; "
        f"height: {styles.get('height', '20px')}; "
        f"border: {styles.get('border', 'none')}; "
        f"background-color: {styles.get('backgroundColor', '#f0f0f0').replace('var(--muted)', '#f0f0f0')}; "
        f"padding: {styles.get('padding', '4px')}; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-left: {styles.get('marginLeft', '0px')}; "
        f"margin-right: {styles.get('marginRight', '0px')}; "
        f"text-overflow: {styles.get('textOverflow', 'ellipsis')};"
    )
    return f'<div style="{css}">{value}</div>'


def generate_checkbox_field_html(element: dict, value: str) -> str:
    styles = element['styleConfig']
    is_checked = value.lower() == "true"
    check_mark = "[x]" if is_checked else "[ ]"
    check_bg_color = styles.get('checkedBackgroundColor', '#E0E0E0') if is_checked else styles.get('backgroundColor', '#f0f0f0').replace('var(--muted)', '#f0f0f0')
    check_style = (
        f"font-size: {styles.get('size', '14px')}; "
        f"color: {styles.get('checkColor', '#000000')}; "
        f"background-color: {check_bg_color}; "
        f"border: {styles.get('border', 'none')}; "
        f"padding: 2px; "
        f"margin-top: {styles.get('marginTop', '4px')}; "
        f"margin-bottom: {styles.get('marginBottom', '4px')}; "
        f"margin-right: {styles.get('marginRight', '8px')}; "
        f"margin-left: {styles.get('marginLeft', '8px')};"
    )
    label_style = (
        f"font-family: {styles.get('labelFontFamily', 'Helvetica')}; "
        f"font-size: {styles.get('labelFontSize', 14)}px; "
        f"font-style: {styles.get('labelFontStyle', 'normal')}; "
        f"font-weight: {styles.get('labelFontWeight', 'normal')}; "
        f"color: {styles.get('labelColor', '#000000').replace('var(--foreground)', '#000000')}; "
        f"text-align: {styles.get('labelTextAlign', 'left')}; "
        f"margin-left: 8px;"
    )
    label_text = element.get('extraAttributes', {}).get('label', 'CheckBox field')
    return f'''
    <div style="display: flex; align-items: center;">
        <span style="{check_style}">{check_mark}</span>
        <label style="{label_style}">{label_text}</label>
    </div>
    '''


element_type_to_html: Dict[str, Callable[[Dict, str], str]] = {
   'DateField': generate_date_field_html,
   'ImageUploadField': generate_image_field_html,
   'NumberField': generate_number_field_html,
   'ParagraphField': generate_paragraph_field_html,
   'SeparatorField': generate_separator_field_html,
   'SpacerField': generate_spacer_field_html,
   'SubTitleField': generate_subtitle_field_html,
   'TableField': generate_table_field_html,
   'TextAreaField': generate_textarea_field_html,
   'TextField': generate_text_field_html,
   'TitleField': generate_title_field_html,
   'SelectField': generate_select_field_html }
   


def generate_element_html(form: Form, submission: Optional[FormSubmission]) -> str:
    form_content = json.loads(form.content)
    submission_content = json.loads(submission.content) if submission else {}

    html_parts = []
    for element in form_content:
        element_id = element['id']
        value = submission_content.get(element_id, '')
        generate_html = element_type_to_html.get(element['type'])
        if generate_html:
            html_parts.append(generate_html(element, value))
    return ''.join(html_parts)


def _wrap_html(html_parts: list[str]) -> str:
    return (
        '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>'
        + ''.join(html_parts)
        + '</body></html>' )
