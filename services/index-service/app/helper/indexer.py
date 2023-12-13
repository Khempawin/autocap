import faiss
import pandas as pd
import numpy as np

class Indexer:
    def __init__(self):
        self.data = None
        self.vectors = None
        self.vector_dimension = 0
        self.index = None


    def load_indices(self, startup_data_path):
        self.data = pd.read_parquet(startup_data_path, engine="pyarrow")
        self.vectors = np.asarray(list(self.data["encoded_caption"]))
        self.vector_dimension = 512
        self.index = faiss.IndexFlatL2(self.vector_dimension)
        faiss.normalize_L2(self.vectors)
        self.index.add(self.vectors)


    def retrieve_caption_index(self, embedded_image, k):
        _vector = np.array([embedded_image], dtype=np.float32)
        faiss.normalize_L2(_vector)

        # Search
        _, ann = self.index.search(_vector, k=k)
        return list(ann[0])

indexer = Indexer()