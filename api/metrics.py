from models.Page import Page


def word_freq_score(page: Page, word_ids: list):
    score = 0.0

    for q_id in word_ids:
        for word in page.words:
            if q_id == word:
                score += 1
    return score


def doc_loc_score(page: Page, word_ids: list):
    score = 0

    for q_id in word_ids:
        found = False
        for i in range(len(page.words)):
            if page.words[i] == q_id:
                score += i + 1
                found = True
                break
        if not found:
            score += 100000
    return score


def normalize(scores: list, small_better: bool):
    if small_better:
        min_val = min(scores)

        for i in range(len(scores)):
            scores[i] = min_val / max(scores[i], 0.00001)
    else:
        max_val = max(scores)
        max_val = max(max_val, 0.00001)

        for i in range(len(scores)):
            scores[i] = scores[i] / max_val
