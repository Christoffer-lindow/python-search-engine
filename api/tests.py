import unittest
from main import get_id_for_word

class TestGetIdForWord(unittest.TestCase):
    def test_get_id_for_word_empty(self):
        word_dict = dict()
        input_val = ""
        expected = {}
        get_id_for_word(input_val,word_dict)
        actual = word_dict
        self.assertDictEqual(actual,expected)
    
    def test_get_id_for_word_base_case(self):
        word_dict = dict()
        input_val = "hello"
        expected = {"hello": 0}
        get_id_for_word(input_val,word_dict)
        actual = word_dict
        self.assertDictEqual(actual,expected)
    
    def test_get_id_for_word_duplicate_case(self):
        word_dict = dict()
        input_val = "hello"
        expected = {"hello": 0}
        for i in range(5):
            get_id_for_word(input_val,word_dict)
        actual = word_dict
        self.assertDictEqual(actual,expected)
    
    def test_get_id_for_word_multiple_words_case(self):
        word_dict = dict()
        input_val_1 = "hello"
        input_val_2 = "world"
        input_val_3 = "!"
        expected = {"hello": 0, "world": 1, "!": 2}
        get_id_for_word(input_val_1,word_dict)
        get_id_for_word(input_val_2,word_dict)
        get_id_for_word(input_val_3,word_dict)
        actual = word_dict
        self.assertDictEqual(actual,expected)



if __name__ == '__main__':
    unittest.main()
