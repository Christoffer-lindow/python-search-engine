class ScoreEntry():
    def __init__(self, freq_score, loc_score, page_score, url):
        self.freq_score = freq_score
        self.loc_score = loc_score
        self.page_score = page_score
        self.page_name = url.rsplit("/",1)[1]
        self.page_url = url