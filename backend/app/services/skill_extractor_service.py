import spacy
from skillNer.skill_extractor_class import SkillExtractor
from skillNer.general_params import SKILL_DB
from spacy.matcher import PhraseMatcher

nlp = spacy.load("en_core_web_md")
skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)


def extract_skills(text: str):
    try:
        annotations = skill_extractor.annotate(text)

        skills = set()

        for match in annotations.get("results", {}).get("full_matches", []):
            skills.add(match.get("doc_node_value", "").lower())

        for match in annotations.get("results", {}).get("ngram_scored", []):
            skills.add(match.get("doc_node_value", "").lower())

        return list(skills)

    except Exception as e:
        print("Skill extraction error:", e)
        return []