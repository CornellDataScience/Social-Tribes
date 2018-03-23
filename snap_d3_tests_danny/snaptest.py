#literally just makes a TSV of the edges in the graph
import snap

G = snap.LoadEdgeList(snap.PNGraph, "facebook_combined.txt", 0, 1)
print ("G5: Nodes %d, Edges %d" % (G.GetNodes(), G.GetEdges()))

snap.SaveEdgeList(G, "test.txt", "Save as tab-separated list of edges")