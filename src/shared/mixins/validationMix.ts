import { validationMixin } from 'vuelidate';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { IBaseTooltip } from '@/shared/interface/ICommon';

@Component
export default class ValidationMix extends Mixins(Vue, validationMixin) {
  get defaultToolTip(): IBaseTooltip {
    return {
      trigger: 'manual',
      show: false,
      placement: 'left',
      content: '',
      classes: ['popover', 'left'],
    };
  }

  get customToolTip(): any {
    return {};
  }

  get validationGroup(): any {
    throw new Error('validationGroup() override $v 하위 그룹 지정');
  }

  get validationMessages(): any {
    throw new Error('validationMessages() override validation 메시지 지정');
  }

  get tooltipOptions(): any {
    const self = this;
    return Object.keys(this.validationGroup.$params).reduce((previousValue, name) => {
      if (self.validationGroup[name].$error) {
        const firstErrorKey: any = self.pickFirstError(name);
        const message: string = self.validationMessages[name][firstErrorKey];
        const toolTip = { ...self.defaultToolTip, ...self.customToolTip[name] };
        return { ...previousValue, [name]: { ...toolTip, content: message, show: true } };
      }
      return { ...previousValue, [name]: { ...self.defaultToolTip } };
    }, {});
  }

  private pickFirstError(name: string): any {
    return Object.keys(this.validationGroup[name].$params)
      .filter((validCategory) => !this.validationGroup[name][validCategory])
      .shift();
  }
}
