import { GuitarInfo } from '../../../constants/guitars';
import { GuitarType } from '../../../types/guitar';

type SpecificationsTabType = {
  vendorCode: string,
  type: GuitarType,
  description: string,
  stringCount: number,
}

function SpecificationsTab({ vendorCode, stringCount, description, type }: SpecificationsTabType) {
  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <tbody>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{GuitarInfo[type]?.nameForOne}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{stringCount} струнная</td>
          </tr>
        </tbody>
      </table>
      <p className="tabs__product-description hidden">{description}</p>
    </div>
  );
}

export default SpecificationsTab;
