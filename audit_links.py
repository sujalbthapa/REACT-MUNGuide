import requests
import time

def check_links():
    with open('links_to_check.txt', 'r') as f:
        links = [line.strip() for line in f if line.strip()]
    
    results = []
    for link in links:
        try:
            # Using a head request to be efficient
            response = requests.head(link, allow_redirects=True, timeout=10)
            status = response.status_code
        except Exception as e:
            status = f"ERROR: {str(e)}"
        
        print(f"{status} | {link}")
        results.append(f"{status} | {link}")
        time.sleep(0.5) # Avoid hammering servers
        
    with open('link_audit_results.txt', 'w') as out:
        out.write("\n".join(results))

if __name__ == "__main__":
    check_links()
