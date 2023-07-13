# https://qiita.com/windows222/items/232f05bafa95a9c8874e#%E3%82%B3%E3%83%BC%E3%83%89
# https://colab.research.google.com/drive/1n0qtXXUdHdK376VjFM-rtAR9PWIPjNXi?usp=sharing

# Step 1: Convert PDF to text
doc = textract.process("sample_document2.pdf")
# Step 2: Save to .txt and reopen (helps prevent issues)
# ChatGPT: このステップはPythonではエンコーディングの問題を回避するために行っていますが、JavaScriptでは通常このステップは不要です。
with open('attention_is_all_you_need.txt', 'w') as f:
    f.write(doc.decode('utf-8'))

with open('attention_is_all_you_need.txt', 'r') as f:
    text = f.read()

# Step 3: Create function to count tokens
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

def count_tokens(text: str) -> int:
    return len(tokenizer.encode(text))

# Step 4: Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(
    # Set a really small chunk size, just to show.
    chunk_size = 512,
    chunk_overlap  = 24,
    length_function = count_tokens,
)

chunks2 = text_splitter.create_documents([text])
