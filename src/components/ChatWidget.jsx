import React, { useState, useRef, useEffect, useReducer } from 'react';
import { MessageCircle, X, User, Bot, Settings, RefreshCw } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Chào bạn! Mình là Linh - trợ lý AI của shop sâm này 😊 Bạn muốn tìm hiểu gì về sâm không?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productData, setProductData] = useState(null);
  const messagesEndRef = useRef(null);

  // Conversation state management
  const [conversationState, dispatch] = useReducer(conversationReducer, {
    currentTopic: null,
    suggestedProducts: []
  });

  function conversationReducer(state, action) {
    switch(action.type) {
      case 'UPDATE_TOPIC':
        return { ...state, currentTopic: action.payload };
      case 'SUGGEST_PRODUCTS':
        return { ...state, suggestedProducts: action.payload };
      default:
        return state;
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      lastUpdated: new Date().toLocaleString('vi-VN'),
      products: {
        'sam_han_quoc': {
          name: 'Sâm Hàn Quốc 6 năm tuổi',
          price: { min: 2800000, max: 5200000 },
          stock: 45,
          origin: 'Hàn Quốc',
          benefits: ['Tăng cường miễn dịch', 'Cải thiện trí nhớ', 'Hỗ trợ tim mạch', 'Giảm stress'],
          forms: ['Củ khô', 'Tinh chất', 'Viên nang', 'Trà túi lọc'],
          bestSeller: true
        },
        'sam_ngoc_linh': {
          name: 'Sâm Ngọc Linh tự nhiên',
          price: { min: 12000000, max: 35000000 },
          stock: 8,
          origin: 'Kon Tum, Việt Nam',
          benefits: ['Tăng sinh lực mạnh', 'Bồi bổ thận khí', 'Chống lão hóa', 'Cân bằng nội tiết'],
          forms: ['Củ tươi', 'Củ khô', 'Ngâm rượu'],
          rare: true
        },
        'sam_tuoi': {
          name: 'Sâm tươi 4-5 năm tuổi',
          price: { min: 900000, max: 1800000 },
          stock: 120,
          origin: 'Hàn Quốc/Trung Quốc',
          benefits: ['Thanh nhiệt', 'Dễ hấp thụ', 'Bổ dưỡng nhẹ nhàng'],
          forms: ['Củ tươi'],
          seasonal: true,
          season: 'Thu-Đông'
        }
      },
      promotions: [
        'Giảm 15% sâm Hàn Quốc cho khách mua lần đầu',
        'Mua 2 hộp tinh chất tặng 1 hộp trà sâm',
        'Free ship toàn quốc cho đơn từ 2 triệu'
      ],
      weather: 'Thu se lạnh - thời điểm tốt để bổ sâm',
      trending: ['Tinh chất sâm Hàn Quốc', 'Sâm Ngọc Linh ngâm mật ong']
    };
    
    setProductData(mockData);
    setIsUpdating(false);
  };

  const getQuickReplies = () => {
    return [
      { text: "Giá sâm Hàn Quốc là bao nhiêu?", topic: "price_korean" },
      { text: "Sâm Ngọc Linh giá bao nhiêu?", topic: "price_ngoclinh" },
      { text: "Sâm nào tốt cho người già?", topic: "benefits_elderly" },
      { text: "Sâm nào phù hợp cho người mới dùng?", topic: "benefits_beginner" },
      { text: "Hiện có khuyến mãi gì không?", topic: "promotions" },
      { text: "Cách sử dụng sâm hiệu quả?", topic: "usage" },
      { text: "Sâm Ngọc Linh có tác dụng gì?", topic: "benefits_ngoclinh" },
      { text: "Tư vấn sản phẩm phù hợp cho tôi", topic: "recommendation" },
      { text: "Sâm tươi và sâm khô khác nhau thế nào?", topic: "comparison" },
      { text: "Sâm có dùng được cho phụ nữ mang thai không?", topic: "safety_pregnancy" },
      { text: "Cách bảo quản sâm đúng cách?", topic: "storage" },
      { text: "Sâm Hàn Quốc hay Việt Nam tốt hơn?", topic: "comparison_origin" },
      { text: "Có ship hàng quốc tế không?", topic: "shipping" },
      { text: "Sâm có tác dụng phụ gì không?", topic: "side_effects" },
      { text: "Mua số lượng lớn có ưu đãi không?", topic: "bulk_discount" }
    ];
  };

  const handleQuestionSelect = async (question) => {
    const userMessage = {
      id: Date.now(),
      text: question.text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    dispatch({ type: 'UPDATE_TOPIC', payload: question.topic });
    setIsTyping(true);

    try {
      let botResponse;
      
      switch(question.topic) {
        case 'price_korean':
          botResponse = await handlePriceKoreanQuestion();
          break;
        case 'price_ngoclinh':
          botResponse = await handlePriceNgocLinhQuestion();
          break;
        case 'benefits_elderly':
          botResponse = await handleBenefitsElderlyQuestion();
          break;
        case 'benefits_beginner':
          botResponse = await handleBenefitsBeginnerQuestion();
          break;
        case 'promotions':
          botResponse = await handlePromotionsQuestion();
          break;
        case 'usage':
          botResponse = await handleUsageQuestion();
          break;
        case 'benefits_ngoclinh':
          botResponse = await handleBenefitsNgocLinhQuestion();
          break;
        case 'recommendation':
          botResponse = await handleRecommendation();
          break;
        case 'comparison':
          botResponse = await handleComparisonQuestion();
          break;
        case 'safety_pregnancy':
          botResponse = await handleSafetyPregnancyQuestion();
          break;
        case 'storage':
          botResponse = await handleStorageQuestion();
          break;
        case 'comparison_origin':
          botResponse = await handleComparisonOriginQuestion();
          break;
        case 'shipping':
          botResponse = await handleShippingQuestion();
          break;
        case 'side_effects':
          botResponse = await handleSideEffectsQuestion();
          break;
        case 'bulk_discount':
          botResponse = await handleBulkDiscountQuestion();
          break;
        case 'custom':
          botResponse = `Cảm ơn câu hỏi của bạn! Mình sẽ kiểm tra thông tin chi tiết. Bạn có thể chọn các câu hỏi gợi ý để mình tư vấn nhanh hơn ạ!`;
          break;
        default:
          botResponse = "Xin lỗi, mình không hiểu câu hỏi của bạn. Vui lòng chọn một câu hỏi khác.";
      }

      const newBotMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Xin lỗi, mình gặp chút trục trặc. Vui lòng thử lại sau!",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePriceKoreanQuestion = async () => {
    return `Dạ, giá sâm Hàn Quốc 6 năm tuổi hiện tại dao động từ **2.8 triệu đến 5.2 triệu** tùy dạng (củ khô, tinh chất, viên nang, trà túi lọc). Hiện có ưu đãi **giảm 15%** cho khách mua lần đầu ạ! Bạn muốn tìm hiểu thêm về dạng nào?`;
  };

  const handlePriceNgocLinhQuestion = async () => {
    return `Sâm Ngọc Linh tự nhiên hiện có giá từ **12 triệu đến 35 triệu** tùy loại (củ tươi, củ khô, ngâm rượu). Đây là loại sâm quý hiếm, chỉ có ở Kon Tum, Việt Nam. Bạn muốn biết thêm về cách sử dụng hay ưu đãi không ạ?`;
  };

  const handleBenefitsElderlyQuestion = async () => {
    return `Dạ, với người lớn tuổi, sâm rất tốt để tăng cường sức khỏe:
- **Sâm Hàn Quốc**: Hỗ trợ tim mạch, cải thiện trí nhớ, giảm mệt mỏi.
- **Sâm Ngọc Linh**: Bồi bổ toàn diện, tăng sinh lực, chống lão hóa.
- **Tinh chất sâm**: Dễ sử dụng, phù hợp cho người khó nhai.
Gợi ý: Tinh chất sâm Hàn Quốc hoặc sâm Ngọc Linh ngâm mật ong rất phù hợp ạ. Bạn cần tư vấn thêm không?`;
  };

  const handleBenefitsBeginnerQuestion = async () => {
    return `Nếu bạn mới dùng sâm, mình khuyên nên bắt đầu với:
- **Sâm tươi**: Nhẹ nhàng, thanh nhiệt, dễ hấp thụ (900k-1.8 triệu).
- **Trà sâm Hàn Quốc**: Tiện lợi, bổ dưỡng nhẹ, giá phải chăng.
Bạn có thể dùng thử trà sâm hoặc sâm tươi hầm canh để làm quen ạ. Bạn muốn mình gợi ý thêm không?`;
  };

  const handlePromotionsQuestion = async () => {
    return `Hiện shop có các chương trình khuyến mãi sau ạ:
    
🎉 Giảm 15% sâm Hàn Quốc cho khách mua lần đầu
🎁 Mua 2 hộp tinh chất tặng 1 hộp trà sâm
🚚 Free ship toàn quốc cho đơn từ 2 triệu

Bạn quan tâm chương trình nào ạ?`;
  };

  const handleUsageQuestion = async () => {
    return `Cách sử dụng sâm hiệu quả:
    
1. Sâm khô: Ngâm mật ong hoặc hãm trà
2. Tinh chất: Dùng 1-2 ống/ngày
3. Sâm tươi: Hầm canh, ngâm rượu

Bạn đang quan tâm loại sâm nào ạ?`;
  };

  const handleBenefitsNgocLinhQuestion = async () => {
    return `Sâm Ngọc Linh là loại sâm quý của Việt Nam, có tác dụng:
- **Bồi bổ toàn diện**: Tăng cường sinh lực, phục hồi sức khỏe.
- **Chống lão hóa**: Giúp da dẻ hồng hào, cải thiện nội tiết.
- **Hỗ trợ miễn dịch**: Tăng sức đề kháng, đặc biệt tốt cho người yếu.
Bạn muốn biết cách dùng hay giá cả của sâm Ngọc Linh không ạ?`;
  };

  const handleRecommendation = async () => {
    const recommendations = [
      { name: 'Sâm Hàn Quốc 6 năm tuổi', price: '2.8-5.2 triệu', benefit: 'Tăng cường sức khỏe tổng thể' },
      { name: 'Sâm Ngọc Linh', price: '12-35 triệu', benefit: 'Bồi bổ cao cấp' },
      { name: 'Tinh chất sâm', price: '1.2 triệu/hộp', benefit: 'Tiện lợi, dễ sử dụng' }
    ];
    
    dispatch({ type: 'SUGGEST_PRODUCTS', payload: recommendations });
    
    return `Dựa trên nhu cầu phổ biến, mình gợi ý:
    
${recommendations.map((p, i) => 
  `${i+1}. ${p.name} (${p.price}) - ${p.benefit}`
).join('\n')}

Bạn quan tâm sản phẩm nào ạ?`;
  };

  const handleComparisonQuestion = async () => {
    return `Sự khác biệt giữa sâm tươi và sâm khô:
- **Sâm tươi**: Dễ hấp thụ, phù hợp hầm canh hoặc ngâm rượu, nhưng cần bảo quản lạnh.
- **Sâm khô**: Cô đặc dưỡng chất, dùng lâu dài (ngâm mật ong, hãm trà), bảo quản dễ hơn.
Tùy mục đích, sâm tươi hợp để bồi bổ nhanh, sâm khô hợp dùng dần. Bạn muốn mình gợi ý loại nào?`;
  };

  const handleSafetyPregnancyQuestion = async () => {
    return `Phụ nữ mang thai nên cẩn thận khi dùng sâm vì có thể ảnh hưởng đến cơ thể. Tốt nhất nên:
- Tham khảo ý kiến bác sĩ trước khi sử dụng.
- Nếu muốn bổ sung nhẹ, có thể dùng **trà sâm Hàn Quốc** với liều thấp.
Bạn cần mình tư vấn thêm về sản phẩm an toàn không ạ?`;
  };

  const handleStorageQuestion = async () => {
    return `Cách bảo quản sâm đúng cách:
- **Sâm tươi**: Giữ trong tủ lạnh (0-5°C), dùng trong 1-2 tuần.
- **Sâm khô**: Để nơi khô ráo, tránh ánh nắng, có thể bảo quản vài năm.
- **Tinh chất sâm**: Bảo quản nơi mát, tránh nhiệt độ cao.
Bạn đang dùng loại sâm nào để mình hướng dẫn chi tiết hơn ạ?`;
  };

  const handleComparisonOriginQuestion = async () => {
    return `Sâm Hàn Quốc và sâm Việt Nam (Ngọc Linh) đều tốt, nhưng khác nhau:
- **Sâm Hàn Quốc**: Phổ biến, giá hợp lý, tốt cho tim mạch, miễn dịch.
- **Sâm Ngọc Linh**: Quý hiếm, dưỡng chất cao, bồi bổ mạnh, chống lão hóa.
Tùy ngân sách và mục đích, mình sẽ gợi ý loại phù hợp. Bạn muốn dùng sâm để làm gì ạ?`;
  };

  const handleShippingQuestion = async () => {
    return `Dạ, shop có hỗ trợ **ship hàng quốc tế** cho một số quốc gia ạ! 
- **Phí ship**: Tùy địa điểm, sẽ báo giá cụ thể khi bạn đặt hàng.
- **Thời gian**: Thường 5-10 ngày làm việc.
Bạn muốn ship đến đâu để mình tư vấn thêm ạ?`;
  };

  const handleSideEffectsQuestion = async () => {
    return `Sâm thường an toàn khi dùng đúng liều lượng, nhưng cần lưu ý:
- Dùng quá liều có thể gây mất ngủ, tăng huyết áp.
- Người có bệnh mãn tính (cao huyết áp, tiểu đường) nên hỏi bác sĩ.
- Tránh dùng sâm buổi tối để không ảnh hưởng giấc ngủ.
Bạn cần mình hướng dẫn liều lượng cụ thể không ạ?`;
  };

  const handleBulkDiscountQuestion = async () => {
    return `Dạ, mua số lượng lớn shop có ưu đãi đặc biệt:
- Mua từ **5 sản phẩm**: Giảm 10% tổng đơn.
- Mua từ **10 sản phẩm**: Giảm 15% + free ship.
Bạn định mua số lượng bao nhiêu để mình tính ưu đãi cụ thể ạ?`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse relative"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            AI
          </div>
          {isUpdating && (
            <div className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-spin">
              <RefreshCw size={10} />
            </div>
          )}
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col border border-gray-200">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-base">Linh - AI Tư Vấn Sâm</h3>
                <p className="text-sm opacity-90">Chọn câu hỏi hoặc gõ để được tư vấn</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="hover:bg-orange-800 p-1 rounded transition-colors"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-orange-800 p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="p-4 bg-gray-100 border-b">
              <button
                onClick={fetchProductData}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Làm mới dữ liệu
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div>
                    <div className={`p-4 rounded-lg text-base ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white ml-3 rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-sm border mr-3 rounded-bl-sm'
                    }`}>
                      <div className="whitespace-pre-line">{message.text}</div>
                    </div>
                    <div className={`text-sm text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right mr-3' : 'ml-3'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {conversationState.suggestedProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {conversationState.suggestedProducts.slice(0, 4).map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect({
                      text: `Tôi quan tâm đến ${product.name}`,
                      topic: 'product_detail'
                    })}
                    className="bg-white p-3 rounded-lg border shadow-xs text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm truncate">{product.name}</div>
                    <div className="text-orange-600 text-xs">{product.price}</div>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <input
              type="text"
              placeholder="Gõ câu hỏi của bạn..."
              className="w-full p-3 mb-3 border border-orange-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleQuestionSelect({ text: e.target.value, topic: 'custom' });
                  e.target.value = '';
                }
              }}
            />
            <div className="grid grid-cols-2 gap-3 max-h-[150px] overflow-y-auto">
              {getQuickReplies().map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSelect(question)}
                  className="px-4 py-3 bg-white border border-orange-300 text-orange-700 rounded-lg text-sm hover:bg-orange-50 transition-colors text-left"
                >
                  {question.text}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-3 text-center">
              📞 Hotline: <span className="text-orange-600 font-semibold">0123.456.789</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;