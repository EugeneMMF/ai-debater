from flask import Flask, jsonify, json, request
import google.generativeai as genai
import os
import markdown

def generate_html(text):
    return markdown.markdown(text, extensions=['markdown.extensions.tables'])

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)

@app.route('/chat', methods=['POST', 'GET'])
def chat():
    status = 400
    returnMessage = {
        "status": "error",
        "error": "Only supports POST requests."
    }
    if request.method == "POST":
        data = request.data
        try:
            data = json.loads(data)
            role = data['role']
            history = data['history']
            prompt = data['prompt']
            # print(role)
            # print(history)
            # print(prompt)
            model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=role)
            chat = model.start_chat(history=history)
            response = chat.send_message(prompt)
            returnMessage = {
                "status": "success",
                "unaltered": response.text,
                "content": generate_html(response.text)
            }
            # returnMessage = {}
            status = 200
        except Exception as e:
            print(repr(e))
            returnMessage = {
                "status": "error",
                "error": repr(e)
            }
    return jsonify(returnMessage), status, {"Access-Control-Allow-Origin": "*"}

if __name__ == "__main__":
    app.run('192.168.1.88', 5000, debug=True)