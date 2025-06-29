


def convert_to_name_for_table(str: str): 
   chars = []

   for current_idx, char in enumerate(str):

      if current_idx and char.isupper():
         next_current_idx = current_idx + 1

         flag = next_current_idx >= len(str) or str[next_current_idx].isupper()
         prev_char = str[current_idx - 1]

         if (prev_char.isupper() and flag):
            pass
         else:
            chars.append('_')
         
      chars.append(char.lower())

   return "".join(chars)
