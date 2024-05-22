# Flask-backend Dockerfile

FROM python:3.9-slim

WORKDIR /app

COPY req.txt req.txt
RUN pip install -r req.txt

COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]
