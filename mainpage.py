from marvel import Marvel
import json
#endpoint = "http(s)://gateway.marvel.com/"

PUBLIC_KEY = 'f4d3befbd6c697e537cafcf9953ccbcf'
PRIVATE_KEY = 'f93a2caa1a2831e29d209f2ab90294787fde7fcc'
m = Marvel(PUBLIC_KEY, PRIVATE_KEY)
  
# getting the characters object
characters = m.characters 
all_characters=characters.all()
# serial code of your favourite character
# this can be different according to your preference
x = 1011334 
for n in range (0, 6): 
    
      # serach for comics of this character
    all_characters=characters.comics(x) 
      
    x = x+1 
    for i in range (1,12):
      print(all_characters)
      #['data']['results'][int(i)]['title'])


