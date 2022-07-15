import { Container, VDOM } from 'cx/ui';
import { closest, findFirstChild, isFocusable } from 'cx/util';

export class RowEditorFloater extends Container {
   declareData(...args) {
      return super.declareData(...args, { autoFocusFirstField: undefined });
   }

   render(context, instance, key) {
      return (
         <RowEditorFloaterCmp key={key} data={instance.data}>
            {this.renderChildren(context, instance)}
         </RowEditorFloaterCmp>
      );
   }
}

RowEditorFloater.prototype.styled = true;
RowEditorFloater.prototype.baseClass = 'roweditorfloater';
RowEditorFloater.prototype.autoFocusFirstField = false;

class RowEditorFloaterCmp extends VDOM.Component {
   render() {
      let { data, children } = this.props;

      return (
         <div
            className={data.classNames}
            ref={(el) => {
               this.el = el;
            }}
         >
            <div
               className="cxe-roweditorfloater-floater"
               ref={(el) => {
                  this.floaterEl = el;
               }}
            >
               {children}
            </div>
         </div>
      );
   }

   componentDidMount() {
      this.scroller = closest(this.el, (parent) => parent.classList.contains('cxe-grid-scroll-area'));
      this.reposition = this.reposition;
      this.scroller.addEventListener('scroll', this.reposition);
      this.reposition();

      if (this.props.data.autoFocusFirstField) {
         let rowEl = closest(this.el, (parent) => parent.classList.contains('cxe-grid-data'));
         if (rowEl) {
            let focusableChild = findFirstChild(rowEl, isFocusable);
            if (focusableChild) {
               setTimeout(() => {
                  focusableChild.focus();
               }, 0);
            }
         }
      }
   }

   reposition() {
      let eb = this.el.parentElement.getBoundingClientRect();
      let sb = this.scroller.getBoundingClientRect();

      let left = sb.left + sb.width / 2 - this.floaterEl.offsetWidth / 2;
      let top = sb.top;

      this.floaterEl.style.left = `${left}px`;

      if (eb.bottom > sb.bottom - 50) this.floaterEl.style.bottom = `${window.innerHeight - eb.top}px`;
      else this.floaterEl.style.top = `${eb.bottom}px`;
   }

   componentWillUnmount() {
      this.scroller.removeEventListener('scroll', this.reposition);
   }
}
