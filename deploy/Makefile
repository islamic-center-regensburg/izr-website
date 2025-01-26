all:
	docker build -t test_izr_website .
	docker rm -f izr_website || true
	docker run -d -p 80:80 --name izr_website test_izr_website

