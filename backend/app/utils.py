import random
from .models import Pair

def generate_unique_pairs(user_ids, week):
    """
    Generates unique pairs of users for a given week, ensuring that pairs are not duplicated.
    """
    random.shuffle(user_ids)  # Randomize user order

    # even number of users by dropping last one if necessary
    if len(user_ids) % 2 != 0:
        user_ids.pop()

    pairs = []
    for i in range(0, len(user_ids), 2):
        user1_id = user_ids[i]
        user2_id = user_ids[i + 1]

        # Checking if this pair already exists for the week
        existing_pair = Pair.query.filter(
            (Pair.user1_id == user1_id) & (Pair.user2_id == user2_id) & (Pair.week == week)
        ).first()

        if not existing_pair:
            pairs.append((user1_id, user2_id))

    return pairs

def validate_user_input(data, required_fields):
    """
    Validates that required fields are present in the data.
    """
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        raise ValueError(f"Missing fields: {', '.join(missing_fields)}")
    return True
