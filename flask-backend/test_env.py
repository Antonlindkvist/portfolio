


class_name = "loggerhead, loggerhead, "
class_name.replace(',', '')
space_index1 = class_name.find(' ')
space_index2 = class_name.find(' ', space_index1 + 1)

# Om det inte finns ett andra mellanslag, sätt space_index2 till längden av strängen
if space_index2 == -1:
    space_index2 = len(class_name)

    # Kontrollera om de två första orden är identiska
if class_name[:space_index1] == class_name[space_index1 + 1:space_index2]:
    result = class_name[:space_index1]
else:
    result = class_name[:space_index2 + 1]

print(result)
    
    