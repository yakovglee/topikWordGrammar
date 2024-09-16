import pandas as pd
import re

# Загрузка данных из Excel файла
# Убедитесь, что установлен пакет openpyxl для чтения и записи Excel файлов
input_file = 'wordGrammar.xlsx'
output_file = 'wordUpd.xlsx'


def remove_numbers(s):
    return re.sub(r'\d+', '', s)


def remove_dot(s):
    return re.sub(r'‧', '', s)


def remove_slash(s):
    return re.sub('/', '', s)


df = pd.read_excel(input_file)

upd_col = ['어휘', '품사']
for col in upd_col:

    df[col] = df[col].apply(remove_numbers)
    df[col] = df[col].apply(remove_dot)
    df[col] = df[col].apply(remove_slash)
    df = df.explode(col)

df_unique = df.drop_duplicates(keep='first')

columns_to_drop = ['등급별 번호', '어휘교육내용개발(1-4단계)', '등급.1']
df_unique = df_unique.drop(columns=columns_to_drop)

rename_dict = {
    '전체 번호': 'id',
    '등급': 'level',
    '어휘': 'word',
    '품사': 'part', 
    '길잡이말': 'example'
}
df_unique = df_unique.rename(columns=rename_dict)


df_unique.to_excel(output_file, index=False)