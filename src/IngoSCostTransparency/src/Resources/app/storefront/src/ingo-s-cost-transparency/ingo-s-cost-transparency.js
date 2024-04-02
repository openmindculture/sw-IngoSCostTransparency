import Plugin from 'src/plugin-system/plugin.class';

export default class IngoSCostTransparency extends Plugin {
    init() {
        console.log('ready to set regular event handler');
        this.addEffectsAndSwitchDetailsHandler();

        console.log('ready to set percentage styles');
        this.applyPercentageStyles();

        // this.$emitter.publish('onClickOffCanvasTab');

        console.log('done setting regular event handler, now add plugin emitter listener');
        const tabElement = document.querySelector('#ingos-cost-transparency-tab');
        if (tabElement) {
            const offCanvasTabPlugin = window.PluginManager.getPluginInstanceFromElement(tabElement);
            if (offCanvasTabPlugin) {
                offCanvasTabPlugin.$emitter.subscribe('hideCookieBar', this.onHideCookieBar);
            } else {
                console.log('no offCanvasTabPlugin');
            }
        } else {
            console.log('no tabElement');
        }

        /*
        if (tabElement && tabElement.$emitter && tabElement.$emitter.subscribe && typeof tabElement.$emitter.subscribe === 'function') {
            tabElement.$emitter.subscribe('onClickOffCanvasTab', () => {
                this.addEffectsAndSwitchDetailsHandler();
            })
        }
        */
    }
    addEffectsAndSwitchDetailsHandler() {
        console.log('addEffectsAndSwitchDetailsHandler');
        const animatableElements = document.querySelectorAll('.ingos-cost-group');
        console.log('animatableElements', animatableElements);
        for (let i=0; i < animatableElements.length; i++) {
            console.log(`animatableElements[${i}]`, animatableElements[i]);
            if (!animatableElements[i].dataset.hasEventListener) {
                console.log('Element had no event listener yet. Add event listener...')
                animatableElements[i].addEventListener('click', this.addEffectsAndSwitchDetails);
                animatableElements[i].dataset.hasEventListener='true';
            } else {
                console.log('element already has an event listener');
            }
        }
        console.log('after iterating animatableElements');
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