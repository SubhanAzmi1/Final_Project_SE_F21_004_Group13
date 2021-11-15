import marvel as Marvel
  
m = Marvel("f4d3befbd6c697e537cafcf9953ccbcf",
           "f93a2caa1a2831e29d209f2ab90294787fde7fcc")
  
# getting the characters object
characters = m.characters 
  
# serial code of your favourite character
# this can be different according to your preference
x = 1011334 
for n in range (0, 6): 
    
      # serach for comics of this character
    all_characters=characters.comics(x) 
      
    x = x+1 
    for i in range (1,12):
      print(all_characters['data']['results'][int(i)]['title'])


