class ForceCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        if request.method == 'OPTIONS':
            from django.http import HttpResponse
            response = HttpResponse()
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = '*'
            response['Access-Control-Allow-Headers'] = '*'
            return response
        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = '*'
        response['Access-Control-Allow-Headers'] = '*'
        return response