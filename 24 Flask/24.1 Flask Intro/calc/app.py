from flask import Flask, request
import operations as math

app = Flask(__name__)

math_operations = {
    "add": math.add,
    "sub": math.sub,
    "mult": math.mult,
    "div": math.div
}


@app.route('/math/<operation>')
def math(operation):
    a = request.args.get('a')
    b = request.args.get('b')
    # Converts a/b into integers, and runs the math function associated with the operation passed into the URL
    return f'{math_operations[operation](int(a),int(b))}'
