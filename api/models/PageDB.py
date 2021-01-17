from models.ScoreEntry import ScoreEntry
from os import scandir, listdir
from os.path import isfile, join
from models.Page import Page
from models.Score import ScoreList
from metrics import word_freq_score, doc_loc_score, normalize

class PageDb:
    def __init__(self, url):
        self.word_to_id = dict()
        self.pages = list()
        self.load_db(url)

    def get_sub_folders(self, url):
        sub_folders = [f.path.replace("\\", "/")
                       for f in scandir(url) if f.is_dir()]
        for dirname in sub_folders:
            sub_folders.extend(self.get_sub_folders(dirname))
        return sub_folders

    def get_file_names(self, url):
        return [f for f in listdir(url) if isfile(join(url, f))]

    def get_id_for_word(self, word):
        if len(word) == 0:
            return
        if word in self.word_to_id:
            return self.word_to_id[word]
        else:
            id = len(self.word_to_id)
            self.word_to_id[word] = id
            return id

    def get_file_paths(self, url):
        file_paths = list()
        for folder in self.get_sub_folders(url):
            files = self.get_file_names(folder)
            for file_name in files:
                file_path = f"{folder}/{file_name}"
                file_paths.append(file_path)
        return file_paths

    def query(self, querry_string: str):
        results = list()
        scores = ScoreList()
        query_ids = list()
        querry_words = querry_string.split(" ")
        for word in querry_words:
            query_ids.append(self.get_id_for_word(word))

        for page in self.pages:
            scores.freq_score.append(word_freq_score(page,query_ids))
            scores.loc_score.append(doc_loc_score(page,query_ids))
        
        normalize(scores.freq_score, False)
        normalize(scores.loc_score, True)

        for i in range(len(self.pages)):
            if scores.freq_score[i] > 0:
                freq_score = scores.freq_score[i]
                loc_score = scores.loc_score[i]
                score = 1.0 * freq_score + 0.8 * loc_score
                results.append(ScoreEntry(freq_score,loc_score,score,self.pages[i].url))


        return sorted(results, key=lambda s: s.page_score, reverse=True)

    def load_db(self, url):
        paths = self.get_file_paths(url)

        for file_path in paths:
            with open(file_path, "r") as reader:
                page = Page()
                page.url = file_path
                for line in reader:
                    for word in line.split():
                        page.words.append(self.get_id_for_word(word))
                self.pages.append(page)
