import React, { Component } from "react";
import "./ParkInfo.scss";

class ParkInfo extends Component {
  render() {
    const { parks } = this.props;

  /*
  **parks안에 든 정보  sample 
  [ 
    {"id":1,
    "p_nm":"남산도시자연공원",
    "p_address":"서울특별시 중구 삼일대로 231(예장동)",
    "p_tel":"02-3783-5900",
    "p_facilities":"기반시설 : 광장 45,950㎡, 도로 108,530㎡, 산책로 6.7㎞ (북측:3.7㎞/남측:3.0㎞)\n조경시설 : 연못 1개소(1,078㎡), 파고라, 분수대, 그늘시렁\n운동시설 : 테니스장, 야구장, 궁도장, 배드민턴장\n교양시설 : 도서관, 야외식물원, 안중근의사 기념관\n편익시설 : 주차장, 매점, 음수대, 팔각정, 화장실, 밴치, 타워전망대\n기타시설 : 순환도로 18.9㎞",
    "p_info":"남산공원 차량통행 금지안내\n2005년 5월 1일부터 남산공원에 일반승용차, 택시 통행이 금지되었습니다.\n남산 서울타워까지 명동, 충무로, 동대입구역에서 순환버스(02,03,05번)를 이용하세요 \n",
    "p_img":"http://parks.seoul.go.kr/file/info/view.do?fIdx=1884",
    "lat":"37.5501402",
    "lng":"126.9903773",
    "gugun":"용산구",
    "dong":"용산동2가"},    ... ]
  */

    return (
      <div className="park-info">
        {parks[0].p_nm}
        {/* {JSON.stringify(parks)} */}
      </div>
    );
  }
}

export default ParkInfo;
