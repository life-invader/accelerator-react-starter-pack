import { GuitarInfo } from '../../../constants/guitars';

type SpecificationsTabType = {
  vendorCode: string,
  type: string,
  description: string,
  stringCount: number,
}

function SpecificationsTab({ vendorCode, stringCount, description, type }: SpecificationsTabType) {
  return (
    <>
      <table className="tabs__table">
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
      </table>
      <p className="tabs__product-description hidden">{description}</p>
    </>
  );
}

export default SpecificationsTab;
