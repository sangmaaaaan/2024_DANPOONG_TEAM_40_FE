import * as P from "./PictureModal.style";

interface PictureModalProps {
  onClose: () => void;
  onSelectImage: (image: string) => void;
  onSetDefaultImage: () => void;
}

const PictureModal: React.FC<PictureModalProps> = ({
  onClose,
  onSelectImage,
  onSetDefaultImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onSelectImage(reader.result.toString()); // 이미지 URL 전달
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetDefaultImage = () => {
    onSetDefaultImage(); // 부모 컴포넌트에서 기본 이미지 설정
    onClose(); // 모달 닫기
  };

  return (
    <P.Container>
      <P.Title>프로필 사진</P.Title>
      <P.Option>
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          앨범에서 선택
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </P.Option>
      <P.Option type="button" onClick={handleSetDefaultImage}>
        기본 이미지로 설정
      </P.Option>
      <P.CancelButton type="button" onClick={onClose}>
        <P.Line />
        <P.Cancel>닫기</P.Cancel>
      </P.CancelButton>
    </P.Container>
  );
};

export default PictureModal;
