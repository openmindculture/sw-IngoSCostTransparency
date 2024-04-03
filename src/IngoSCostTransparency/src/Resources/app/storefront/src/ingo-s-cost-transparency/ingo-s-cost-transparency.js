import Plugin from 'src/plugin-system/plugin.class';

export default class IngoSCostTransparency extends Plugin {
    init() {
        this.applyPercentageStyles();
        this.addEffectsAndSwitchDetailsHandler();
        // same for mobile off-canvas version:
        const tabElement = document.querySelector('#ingos-cost-transparency-tab');
        if (tabElement &&
            tabElement.$emitter &&
            tabElement.$emitter.subscribe &&
            typeof tabElement.$emitter.subscribe === 'function'
        ) {
            tabElement.$emitter.subscribe('onClickOffCanvasTab', () => {
                this.addEffectsAndSwitchDetailsHandler();
            })
        }
    }
    addEffectsAndSwitchDetailsHandler() {
        const animatableElements = document.querySelectorAll('.ingos-cost-group');
        for (let i=0; i < animatableElements.length; i++) {
            animatableElements[i].addEventListener('click', this.addEffectsAndSwitchDetails);
        }
    }

    applyPercentageStyles() {
        const rootStyle = document.documentElement.style;
        const percentageBars = document.getElementsByClassName('ingos-cost-group');
        for (let i=0; i < percentageBars.length; i++) {
            if (percentageBars[i].dataset && percentageBars[i].dataset.percentage && percentageBars[i].dataset.index) {
                rootStyle.setProperty(
                    '--ingos-cost-transparency-percentage-' + percentageBars[i].dataset.index,
                    '' + percentageBars[i].dataset.percentage + '%'
                );
            }
        }
    }
    addEffectsAndSwitchDetails(event) {
        if (!event) { return; }
        const activeGroupElement = event.currentTarget;
        if (!activeGroupElement) { return; }
        activeGroupElement.classList.add('ingos-active');
        const activeId = activeGroupElement.dataset.id;
        const costDetailsWrappers = document.getElementsByClassName('ingos-cost-details');

        for (let cgIndex = 0; cgIndex < costDetailsWrappers.length; cgIndex++) {
            let costDetailsWrapper = costDetailsWrappers.item(cgIndex);
            const activeContent = costDetailsWrapper.querySelector('*[data-for="' +  activeId + '"]');
            if (!activeContent) { continue; }
            activeContent.classList.add('ingos-active');

            const costGroups = document.getElementsByClassName('ingos-cost-group');
            for (let i = 0; i < costGroups.length; i++) {
                if (costGroups.item(i) !== activeGroupElement) {
                    costGroups.item(i).classList.remove('ingos-active');
                }
            }

            let costDetails = document.getElementsByClassName('ingos-cost-detail');
            for (let i = 0; i < costDetails.length; i++) {
                if (costDetails.item(i) !== activeContent) {
                    costDetails.item(i).classList.remove('ingos-active');
                }
            }
        }
    }
}