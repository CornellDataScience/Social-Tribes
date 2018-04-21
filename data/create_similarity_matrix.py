from __future__ import division
import json
import numpy as np


with open('political-journalists-connections.json', 'r') as infile:
	connections = json.load(infile)

sim = np.zeros(shape=(len(connections),len(connections)))
ids = []


count1 = 0
for key1 in connections:
	ids.append(key1)
	count2 = 0
	for key2 in connections:
		set1 = set(connections[key1]['followers']).union(set(connections[key1]['friends']))
		set2 = set(connections[key2]['followers']).union(set(connections[key2]['friends']))

		if min(len(set1), len(set2)) == 0:
			score = 0
		else:
			score = len(set1.intersection(set2)) / min(len(set1), len(set2))

		sim[count1,count2] = score
		count2+=1
	count1 += 1

np.savetxt('similarity.csv', sim, delimiter=",")

with open('ids.json','w') as outfile:
	json.dump(ids, outfile)

