import Plugin from 'src/plugin-system/plugin.class';

export default class IngoSCostTransparency extends Plugin {
    init() {
        console.log('ngoSCostTransparency JS init(): skip everything');
        // this.addAnimationEffectClassNames(); // TODO reactivate!
        // this.applyPercentageStyles(); // TODO reactivate!
    }
    addAnimationEffectClassNames() {
        const animatableElements = document.querySelectorAll('.ingos-cost-group');
        for (let i=0; i < animatableElements.length; i++) {
            animatableElements[i].addEventListener('click', this.costGroupEnterHandler);
        }
    }

    applyPercentageStyles() {
        const rootStyle = document.documentElement.style;
        const percentageBars = document.getElementsByClassName('ingos-cost-group');
        for (let i=0; i < percentageBars.length; i++) {
            console.log(`percentageBars[${i}]:`, percentageBars[i]);
            if (percentageBars[i].dataset) { console.log(`percentageBars[${i}].dataset evaluates to true.`) }
            if (percentageBars[i].dataset.percentage) { console.log(`percentageBars[${i}].dataset.percentage evaluates to true.`) }
            if (percentageBars[i].dataset.index) { console.log(`percentageBars[${i}].dataset.index evaluates to true.`) }
            if (percentageBars[i].dataset && percentageBars[i].dataset.percentage && percentageBars[i].dataset.index) {
                rootStyle.setProperty(
                    '--ingos-cost-transparency-percentage-' + percentageBars[i].dataset.index,
                    '' + percentageBars[i].dataset.percentage + '%'
                );
            }
        }
    }
    costGroupEnterHandler(event) {
        if (!event) { return; }
        const activeGroupElement = event.currentTarget;
        activeGroupElement.classList.add('ingos-active');
        const activeId = activeGroupElement.id;
        const costGroupContentWrapper = document.getElementById('ingos-cost-group-contents');
        if (!costGroupContentWrapper) { return; }
        const activeContent = costGroupContentWrapper.querySelector('*[data-for="' +  activeId + '"]');
        if (!activeContent) { return; }
        activeContent.classList.add('ingos-active');

        const inactiveGroups = document.getElementsByClassName('ingos-cost-group');
        for (let i = 0; i < inactiveGroups.length; i++) {
            if (inactiveGroups.item(i) !== activeGroupElement) {
                inactiveGroups.item(i).classList.remove('ingos-active');
            }
        }
        let activeGroup = document.getElementsByClassName('ingos-cost-group-content');
        for (let i = 0; i < activeGroup.length; i++) {
            if (activeGroup.item(i) !== activeContent) {
                activeGroup.item(i).classList.remove('ingos-active');
            }
        }
    }
}