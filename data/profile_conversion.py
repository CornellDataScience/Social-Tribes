import json
with open('ids.json', 'r') as infile:
	ids = json.load(infile)
with open('political-journalists.json', 'r') as infile:
	pjs = json.load(infile)


#Methods take a list of indexes corresponding to the row index of the similarity matrix
#Make sure that 'political-journalists.json' and 'ids.json' are in the same directory

def get_names(indexes):
	return [pjs[ids[i]]['name'] for i in indexes]

def get_follower_count(indexes):
	return [pjs[ids[i]]['followers_count'] for i in indexes]

def get_all_names():
	return [pjs[i]['name'] for i in ids]

def get_all_followers():
	return [pjs[i]['followers_count'] for i in ids]

def get_all_descriptions():
	return [pjs[i]['description'] for i in ids]
