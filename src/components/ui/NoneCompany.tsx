const NoneCompany = () => {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
      <div className="text-6xl mb-4">🏢</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Không tìm thấy công ty phù hợp
      </h3>
      <p className="text-gray-600 mb-6">
        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn
      </p>
      <Button type="primary" onClick={handleReset} className="!rounded-xl">
        Đặt lại bộ lọc
      </Button>
    </div>
  );
};
export default NoneCompany;
