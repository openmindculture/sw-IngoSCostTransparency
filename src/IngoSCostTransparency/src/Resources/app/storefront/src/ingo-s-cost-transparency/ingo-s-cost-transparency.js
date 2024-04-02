import Plugin from 'src/plugin-system/plugin.class';

export default class IngoSCostTransparency extends Plugin {
    init() {
        console.log('ready to set percentage styles');
        this.applyPercentageStyles();

        console.log('ready to set regular event handler');
        this.addEffectsAndSwitchDetailsHandler();

        // this.$emitter.publish('onClickOffCanvasTab');

        console.log('done setting regular event handler, now add plugin emitter listener');
        const tabElement = document.querySelector('#ingos-cost-transparency-tab');
        if (tabElement) {
            const offCanvasTabPlugin = window.PluginManager.getPluginInstanceFromElement(tabElement);
            if (offCanvasTabPlugin) {
                offCanvasTabPlugin.$emitter.subscribe('hideCookieBar', this.onHideCookieBar);
            } else {
                console.log('no offCanvasTabPlugin, try alternative approach ...');
                if (tabElement && tabElement.$emitter && tabElement.$emitter.subscribe && typeof tabElement.$emitter.subscribe === 'function') {
                    tabElement.$emitter.subscribe('onClickOffCanvasTab', () => {
                        console.log('subscribed onClickOffCanvasTab callback function start...');
                        this.addEffectsAndSwitchDetailsHandler();
                        console.log('... subscribed onClickOffCanvasTab callback function end.');
                    })
                    console.log('Added subscriber to onClickOffCanvasTab.');
                }
            }
        } else {
            console.log('no tabElement');
        }
    }
    addEffectsAndSwitchDetailsHandler() {
        console.log('addEffectsAndSwitchDetailsHandler');
        const animatableElements = document.querySelectorAll('.ingos-cost-group');
        console.log('animatableElements', animatableElements);
        for (let i=0; i < animatableElements.length; i++) {
            console.log(`animatableElements[${i}]`, animatableElements[i]);
            animatableElements[i].addEventListener('click', this.addEffectsAndSwitchDetails);
        }
        console.log('after iterating animatableElements');
    }

    applyPercentageStyles() {
        const rootStyle = document.documentElement.style;
        console.log('applyPercentageStyles, rootStyle:', rootStyle);
        const percentageBars = document.getElementsByClassName('ingos-cost-group');
        for (let i=0; i < percentageBars.length; i++) {
            if (percentageBars[i].dataset && percentageBars[i].dataset.percentage && percentageBars[i].dataset.index) {
                rootStyle.setProperty(
                    '--ingos-cost-transparency-percentage-' + percentageBars[i].dataset.index,
                    '' + percentageBars[i].dataset.percentage + '%'
                );
                console.log('set rootStyle propery ' + '--ingos-cost-transparency-percentage-' + percentageBars[i].dataset.index
                + ' to value ' + percentageBars[i].dataset.percentage + '%');
            } else {
                console.log('cant set percentage style');
            }
        }
        console.log('done iterating percentageBars');
    }
    addEffectsAndSwitchDetails(event) {
        /*
        Nach Off-Canvas-Rendering können wir nicht mehr davon ausgehen, dass es unsere Elemente jeweils nur einmal git.
        Somit verbietet es sich, mit document.getElementById oder analogen Selektoren zu arbeiten.
        Also arbeiten wir entweder über die Plugin-Instanz (als Frontend-Entwickler bestimmt nicht!)
        oder iterieren über alles passende, was wir mit getElementsByClassName finden?
         */

        if (!event) { return; }
        console.log('addEffectsAndSwitchDetails(event), event:', event);
        const activeGroupElement = event.currentTarget;
        console.log(' activeGroupElement = event.currentTarget:', activeGroupElement);
        if (!activeGroupElement) { console.log('no activeGroupElement'); return; }
        activeGroupElement.classList.add('ingos-active');
        const activeId = activeGroupElement.dataset.id;
        const costGroupContentWrappers = document.getElementsByClassName('ingos-cost-group-contents');
        console.log('costGroupContentWrappers:', costGroupContentWrappers);
        for (let cgIndex = 0; cgIndex < costGroupContentWrappers.length; cgIndex++) {
            let costGroupContentWrapper = costGroupContentWrappers.item(cgIndex);
            const activeContent = costGroupContentWrapper.querySelector('*[data-for="' +  activeId + '"]');
            if (!activeContent) { continue; }
            activeContent.classList.add('ingos-active');
            console.log('added className ingos-active to activeContent', activeContent);

            // völlig unlesbare Benamung, die noch auf Code von Chris basiert :(((((

            // wie hätte ich den den sinnvollerweise semantisch und selbsterklärend selbst benannt?
            // was aber auch noch lange nicht erklärt, warum der bloß im offcanvas nicht funktioniert

            // .ingos-cost .ingos-cost-group.ingos-cost-group-0x
            // cost-group are the containers around the bar chart bars and their captions
            const inactiveGroups = document.getElementsByClassName('ingos-cost-group');
            for (let i = 0; i < inactiveGroups.length; i++) {
                console.log(`try to compare if inactiveGroups.item(${i}) !== activeGroupElement`);
                if (inactiveGroups.item(i) !== activeGroupElement) {
                    inactiveGroups.item(i).classList.remove('ingos-active');
                }
            }

            // .ingos-cost-group-contents .ingos-cost-group-content (ohne Eigenklasse, aber mit data-for=...)
            // cost-group-content are the details description elements below the bar charts
            let activeGroup = document.getElementsByClassName('ingos-cost-group-content');
            console.log('activeGroup = .ingos-cost-group-content : ', activeGroup);
            for (let i = 0; i < activeGroup.length; i++) {
                console.log(`try to compare if activeGroup.item(${i}) !== activeContent`);
                console.log('activeContent:', activeContent);
                console.log(`activeGroup.item(${i})`, activeGroup.item(i));
                // could there be a safer, more generic approach, comparing data or tokens instead of elements?
                if (activeGroup.item(i) !== activeContent) {
                    console.log('remove active class from this element',activeGroup.item(i) );
                    activeGroup.item(i).classList.remove('ingos-active');
                }
            }
        }
    }
}