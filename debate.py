import google.generativeai as genai
import os
from argparse import ArgumentParser
import copy

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

BLACK = '\033[30m'
RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m' # orange on some systems
BLUE = '\033[34m'
MAGENTA = '\033[35m'
CYAN = '\033[36m'
LIGHT_GRAY = '\033[37m'
DARK_GRAY = '\033[90m'
BRIGHT_RED = '\033[91m'
BRIGHT_GREEN = '\033[92m'
BRIGHT_YELLOW = '\033[93m'
BRIGHT_BLUE = '\033[94m'
BRIGHT_MAGENTA = '\033[95m'
BRIGHT_CYAN = '\033[96m'
WHITE = '\033[97m'

RESET = '\033[0m' # called to return to standard terminal text color

def get_swapped_messages(messages):
    swapped_messages = []
    for i in range(len(messages)):
        message =  messages[i]
        new_role = ""
        new_role = "model" if message['role'] == "user" else  "user"
        swapped_messages.append({
            "role": new_role,
            "parts": message['parts']
        })
    return swapped_messages

class Response():
    def __init__(self, text):
        self.text = text

def debate(initial_prompt, role1, role2, steps):
    i = 0
    if not steps:
        input(f"Step {i+1}?")
    elif steps <= i:
        return
    i += 1
    print(f"{RED}Debater 1:\n{RESET}{initial_prompt}")
    response = Response(initial_prompt)
    messages = []
    while True:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=role2)
        chat = model.start_chat(history=copy.deepcopy(messages))
        messages.append({
            "role": "user",
            "parts": response.text
        })
        response = chat.send_message(response.text)
        print(f"{GREEN}Debater 2:\n{RESET}{response.text}")
        if not steps:
            input(f"Step {i+1}?")
        elif steps <= i:
            break
        i += 1
        swapped_messages = get_swapped_messages(copy.deepcopy(messages))
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=role1)
        chat = model.start_chat(history=swapped_messages)
        messages.append({
            "role": "model",
            "parts": response.text
        })
        response = chat.send_message(response.text)
        print(f"{RED}Debater 1:\n{RESET}{response.text}")

if "__main__" == __name__:
    args = ArgumentParser()
    args.add_argument("--prompt", "-p", type=str, required=True, help="""The initial promp to start the debate off. Should be from the perspective of role1.\n
                      For example: \n
                      \"Should governments subsidise fuel? I think they are good for the nation.\"""")
    args.add_argument("--role1", "-r1", type=str, required=True, help="""The role to be played by the first debater. Should be opposite to that of role2.\n
                      For example: \n
                      \"You are a huge advocate for fuel subsidies by the government. Push your ideas forward.\"""")
    args.add_argument("--role2", "-r2", type=str, required=True, help="""The role to be played by the second debater. Should be opposite to that of role2.\n
                      For example: \n
                      \"You are highly against the subsidising of fuel costs by governments. Push your ideas forward.\"""")
    args.add_argument("--steps", "-s", type=int, help="The number of steps to run for. If not set then user input is required to produce each step.", default=None)
    parser = args.parse_args()
    initial_prompt = parser.prompt
    role1 = parser.role1
    role2 = parser.role2
    steps = int(parser.steps)
    debate(initial_prompt, role1, role2, steps)