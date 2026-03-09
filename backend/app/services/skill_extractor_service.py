import spacy
from skillNer.skill_extractor_class import SkillExtractor
from skillNer.general_params import SKILL_DB
from spacy.matcher import PhraseMatcher

# Load spaCy model once
nlp = spacy.load("en_core_web_lg")

# Initialize Skill Extractor
skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)


def extract_skills(text: str):
    """
    Extract skills from any text (resume or job description)
    """
    try:
        annotations = skill_extractor.annotate(text)

        skills = []

        # Full matches
        for match in annotations["results"]["full_matches"]:
            skills.append(match["doc_node_value"])

        # Ngram matches
        for match in annotations["results"]["ngram_scored"]:
            skills.append(match["doc_node_value"])

        # Remove duplicates
        skills = list(set(skills))
        print(skills)

        return skills

    except Exception as e:
        print("Skill extraction error:", e)
        return []