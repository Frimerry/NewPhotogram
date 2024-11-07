// (1) 스토리 이미지 업로드를 위한 사진 선택
function imageChoose(obj) {
	let f = obj.files[0];

	if (!f.type.match("image.*")) {
		alert("이미지를 등록해야 합니다.");
		return;
	}

	let reader = new FileReader();
	reader.onload = (e) => {
		$("#imageUploadPreview").attr("src", e.target.result);
	}
	reader.readAsDataURL(f); // 이 코드 실행시 reader.onload 실행됨.
}

// (2) 사진설명 입력 바이트 제한 체크
function checkInputLength(input) {
    const maxBytes = 255;
    let byteCount = 0;
    let charCount = 0;

    for (let i = 0; i < input.value.length; i++) {
        const charCode = input.value.charCodeAt(i);
        byteCount += charCode > 0x7F ? 3 : 1;	// 0x7F(127)보다 크면 3바이트 글자
        
        if (byteCount <= maxBytes) {
            charCount++;
        } else {
            break;
        }
    }

    if (byteCount > maxBytes) {
        input.value = input.value.substring(0, charCount);
    }
}

// (3) 첨부파일 용량 제한
function validateFileSize() {
    const fileInput = $('input[type="file"]')[0];
    const maxSize = 20 * 1024 * 1024; // 1MB를 바이트 단위로 변환

    if (fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size;
        if (fileSize > maxSize) {
            alert("파일 용량이 초과되었습니다. 20MB 이하의 파일만 업로드할 수 있습니다.");
            return false;
        }
    }
    return true;
}