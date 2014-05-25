(function () {}),
function () {
    "use strict";
    angular.module("app.task", []).factory("taskStorage", function () {
        var DEMO_TASKS, STORAGE_ID;
        return STORAGE_ID = "tasks", DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false} ]', {
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS)
            },
            put: function (tasks) {
                return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks))
            }
        }
    }).directive("taskFocus", ["$timeout",
        function ($timeout) {
            return {
                link: function (scope, ele, attrs) {
                    return scope.$watch(attrs.taskFocus, function (newVal) {
                        return newVal ? $timeout(function () {
                            return ele[0].focus()
                        }, 0, !1) : void 0
                    })
                }
            }
        }
    ]).controller("taskCtrl", ["$scope", "taskStorage", "filterFilter", "$rootScope", "logger",
        function ($scope, taskStorage, filterFilter, $rootScope, logger) {
            var tasks;
            return tasks = $scope.tasks = taskStorage.get(), $scope.newTask = "", $scope.remainingCount = filterFilter(tasks, {
                completed: !1
            }).length, $scope.editedTask = null, $scope.statusFilter = {
                completed: !1
            }, $scope.filter = function (filter) {
                switch (filter) {
                case "all":
                    return $scope.statusFilter = "";
                case "active":
                    return $scope.statusFilter = {
                        completed: !1
                    };
                case "completed":
                    return $scope.statusFilter = {
                        completed: !0
                    }
                }
            }, $scope.add = function () {
                var newTask;
                return newTask = $scope.newTask.trim(), 0 !== newTask.length ? (tasks.push({
                    title: newTask,
                    completed: !1
                }), logger.logSuccess('New task: "' + newTask + '" added'), taskStorage.put(tasks), $scope.newTask = "", $scope.remainingCount++) : void 0
            }, $scope.edit = function (task) {
                return $scope.editedTask = task
            }, $scope.doneEditing = function (task) {
                return $scope.editedTask = null, task.title = task.title.trim(), task.title ? logger.log("Task updated") : $scope.remove(task), taskStorage.put(tasks)
            }, $scope.remove = function (task) {
                var index;
                return $scope.remainingCount -= task.completed ? 0 : 1, index = $scope.tasks.indexOf(task), $scope.tasks.splice(index, 1), taskStorage.put(tasks), logger.logError("Task removed")
            }, $scope.completed = function (task) {
                return $scope.remainingCount += task.completed ? -1 : 1, taskStorage.put(tasks), task.completed ? $scope.remainingCount > 0 ? logger.log(1 === $scope.remainingCount ? "Almost there! Only " + $scope.remainingCount + " task left" : "Good job! Only " + $scope.remainingCount + " tasks left") : logger.logSuccess("Congrats! All done :)") : void 0
            }, $scope.clearCompleted = function () {
                return $scope.tasks = tasks = tasks.filter(function (val) {
                    return !val.completed
                }), taskStorage.put(tasks)
            }, $scope.markAll = function (completed) {
                return tasks.forEach(function (task) {
                    return task.completed = completed
                }), $scope.remainingCount = completed ? 0 : tasks.length, taskStorage.put(tasks), completed ? logger.logSuccess("Congrats! All done :)") : void 0
            }, $scope.$watch("remainingCount == 0", function (val) {
                return $scope.allChecked = val
            }), $scope.$watch("remainingCount", function (newVal) {
                return $rootScope.$broadcast("taskRemaining:changed", newVal)
            })
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("app.ui.ctrls", []).controller("NotifyCtrl", ["$scope", "logger",
        function ($scope, logger) {
            return $scope.notify = function (type) {
                switch (type) {
                case "info":
                    return logger.log("Heads up! This alert needs your attention, but it's not super important.");
                case "success":
                    return logger.logSuccess("Well done! You successfully read this important alert message.");
                case "warning":
                    return logger.logWarning("Warning! Best check yo self, you're not looking too good.");
                case "error":
                    return logger.logError("Oh snap! Change a few things up and try submitting again.")
                }
            }
        }
    ]).controller("AlertDemoCtrl", ["$scope",
        function ($scope) {
            return $scope.alerts = [{
                type: "success",
                msg: "Well done! You successfully read this important alert message."
            }, {
                type: "info",
                msg: "Heads up! This alert needs your attention, but it is not super important."
            }, {
                type: "warning",
                msg: "Warning! Best check yo self, you're not looking too good."
            }, {
                type: "danger",
                msg: "Oh snap! Change a few things up and try submitting again."
            }], $scope.addAlert = function () {
                var num, type;
                switch (num = Math.ceil(4 * Math.random()), type = void 0, num) {
                case 0:
                    type = "info";
                    break;
                case 1:
                    type = "success";
                    break;
                case 2:
                    type = "info";
                    break;
                case 3:
                    type = "warning";
                    break;
                case 4:
                    type = "danger"
                }
                return $scope.alerts.push({
                    type: type,
                    msg: "Another alert!"
                })
            }, $scope.closeAlert = function (index) {
                return $scope.alerts.splice(index, 1)
            }
        }
    ]).controller("ProgressDemoCtrl", ["$scope",
        function ($scope) {
            return $scope.max = 200, $scope.random = function () {
                var type, value;
                value = Math.floor(100 * Math.random() + 10), type = void 0, type = 25 > value ? "success" : 50 > value ? "info" : 75 > value ? "warning" : "danger", $scope.showWarning = "danger" === type || "warning" === type, $scope.dynamic = value, $scope.type = type
            }, $scope.random()
        }
    ]).controller("AccordionDemoCtrl", ["$scope",
        function ($scope) {
            $scope.oneAtATime = !0, $scope.groups = [{
                title: "Dynamic Group Header - 1",
                content: "Dynamic Group Body - 1"
            }, {
                title: "Dynamic Group Header - 2",
                content: "Dynamic Group Body - 2"
            }, {
                title: "Dynamic Group Header - 3",
                content: "Dynamic Group Body - 3"
            }], $scope.items = ["Item 1", "Item 2", "Item 3"], $scope.addItem = function () {
                var newItemNo;
                newItemNo = $scope.items.length + 1, $scope.items.push("Item " + newItemNo)
            }
        }
    ]).controller("CollapseDemoCtrl", ["$scope",
        function ($scope) {
            return $scope.isCollapsed = !1
        }
    ]).controller("ModalDemoCtrl", ["$scope", "$modal", "$log",
        function ($scope, $modal, $log) {
            $scope.items = ["item1", "item2", "item3"], $scope.open = function () {
                var modalInstance;
                modalInstance = $modal.open({
                    templateUrl: "myModalContent.html",
                    controller: "ModalInstanceCtrl",
                    resolve: {
                        items: function () {
                            return $scope.items
                        }
                    }
                }), modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem
                }, function () {
                    $log.info("Modal dismissed at: " + new Date)
                })
            }
        }
    ]).controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "items",
        function ($scope, $modalInstance, items) {
            $scope.items = items, $scope.selected = {
                item: $scope.items[0]
            }, $scope.ok = function () {
                $modalInstance.close($scope.selected.item)
            }, $scope.cancel = function () {
                $modalInstance.dismiss("cancel")
            }
        }
    ]).controller("PaginationDemoCtrl", ["$scope",
        function ($scope) {
            return $scope.totalItems = 64, $scope.currentPage = 4, $scope.maxSize = 5, $scope.setPage = function (pageNo) {
                return $scope.currentPage = pageNo
            }, $scope.bigTotalItems = 175, $scope.bigCurrentPage = 1
        }
    ]).controller("TabsDemoCtrl", ["$scope",
        function ($scope) {
            return $scope.tabs = [{
                title: "Dynamic Title 1",
                content: "Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."
            }, {
                title: "Disabled",
                content: "Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",
                disabled: !0
            }], $scope.navType = "pills"
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("app.ui.directives", []).directive("uiTime", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    var checkTime, startTime;
                    return startTime = function () {
                        var h, m, s, t, time, today;
                        return today = new Date, h = today.getHours(), m = today.getMinutes(), s = today.getSeconds(), m = checkTime(m), s = checkTime(s), time = h + ":" + m + ":" + s, ele.html(time), t = setTimeout(startTime, 500)
                    }, checkTime = function (i) {
                        return 10 > i && (i = "0" + i), i
                    }, startTime()
                }
            }
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap", "mgo-angular-wizard", "textAngular", "app.ui.ctrls", "app.ui.directives", "app.controllers", "app.directives",  "app.task", "app.localization"]).config(["$routeProvider",
        function ($routeProvider) {
            return $routeProvider.when("/", {
                redirectTo: "/dashboard"
            }).when("/dashboard", {
                templateUrl: "views/dashboard.html"
            }).when("/ui/typography", {
                templateUrl: "views/ui/typography.html"
            }).when("/ui/buttons", {
                templateUrl: "views/ui/buttons.html"
            }).when("/ui/icons", {
                templateUrl: "views/ui/icons.html"
            }).when("/ui/grids", {
                templateUrl: "views/ui/grids.html"
            }).when("/ui/widgets", {
                templateUrl: "views/ui/widgets.html"
            }).when("/ui/components", {
                templateUrl: "views/ui/components.html"
            }).when("/ui/timeline", {
                templateUrl: "views/ui/timeline.html"
            }).when("/forms/elements", {
                templateUrl: "views/forms/elements.html"
            }).when("/forms/layouts", {
                templateUrl: "views/forms/layouts.html"
            }).when("/forms/validation", {
                templateUrl: "views/forms/validation.html"
            }).when("/forms/wizard", {
                templateUrl: "views/forms/wizard.html"
            }).when("/tables/static", {
                templateUrl: "views/tables/static.html"
            }).when("/tables/responsive", {
                templateUrl: "views/tables/responsive.html"
            }).when("/tables/dynamic", {
                templateUrl: "views/tables/dynamic.html"
            }).when("/charts/others", {
                templateUrl: "views/charts/charts.html"
            }).when("/charts/morris", {
                templateUrl: "views/charts/morris.html"
            }).when("/charts/flot", {
                templateUrl: "views/charts/flot.html"
            }).when("/mail/inbox", {
                templateUrl: "views/mail/inbox.html"
            }).when("/mail/compose", {
                templateUrl: "views/mail/compose.html"
            }).when("/mail/single", {
                templateUrl: "views/mail/single.html"
            }).when("/pages/features", {
                templateUrl: "views/pages/features.html"
            }).when("/pages/signin", {
                templateUrl: "views/pages/signin.html"
            }).when("/pages/signup", {
                templateUrl: "views/pages/signup.html"
            }).when("/pages/lock-screen", {
                templateUrl: "views/pages/lock-screen.html"
            }).when("/pages/profile", {
                templateUrl: "views/pages/profile.html"
            }).when("/404", {
                templateUrl: "views/pages/404.html"
            }).when("/pages/500", {
                templateUrl: "views/pages/500.html"
            }).when("/pages/blank", {
                templateUrl: "views/pages/blank.html"
            }).when("/pages/invoice", {
                templateUrl: "views/pages/invoice.html"
            }).when("/tasks", {
                templateUrl: "views/tasks/tasks.html"
            }).otherwise({
                redirectTo: "/404"
            })
        }
    ])
}.call(this),
function () {
    angular.module("app.directives", []).directive("imgHolder", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return Holder.run({
                        images: ele[0]
                    })
                }
            }
        }
    ]).directive("customBackground", function () {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$location",
                function ($scope, $element, $location) {
                    var addBg, path;
                    return path = function () {
                        return $location.path()
                    }, addBg = function (path) {
                        switch ($element.removeClass("body-home body-special body-tasks body-lock"), path) {
                        case "/":
                            return $element.addClass("body-home");
                        case "/404":
                        case "/pages/500":
                        case "/pages/signin":
                        case "/pages/signup":
                            return $element.addClass("body-special");
                        case "/pages/lock-screen":
                            return $element.addClass("body-special body-lock");
                        case "/tasks":
                            return $element.addClass("body-tasks")
                        }
                    }, addBg($location.path()), $scope.$watch(path, function (newVal, oldVal) {
                        return newVal !== oldVal ? addBg($location.path()) : void 0
                    })
                }
            ]
        }
    }).directive("uiColorSwitch", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return ele.find(".color-option").on("click", function (event) {
                        var $this, hrefUrl, style;
                        if ($this = $(this), hrefUrl = void 0, style = $this.data("style"), "loulou" === style) hrefUrl = "styles/main.css", $('link[href^="styles/main"]').attr("href", hrefUrl);
                        else {
                            if (!style) return !1;
                            style = "-" + style, hrefUrl = "styles/main" + style + ".css", $('link[href^="styles/main"]').attr("href", hrefUrl)
                        }
                        return event.preventDefault()
                    })
                }
            }
        }
    ]).directive("toggleMinNav", ["$rootScope",
        function ($rootScope) {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    var $window, Timer, app, updateClass;
                    return app = $("#app"), $window = $(window), ele.on("click", function (e) {
                        return app.hasClass("nav-min") ? app.removeClass("nav-min") : (app.addClass("nav-min"), $rootScope.$broadcast("minNav:enabled")), e.preventDefault()
                    }), Timer = void 0, updateClass = function () {
                        var width;
                        return width = $window.width(), 768 > width ? app.removeClass("nav-min") : void 0
                    }, $window.resize(function () {
                        var t;
                        return clearTimeout(t), t = setTimeout(updateClass, 300)
                    })
                }
            }
        }
    ]).directive("collapseNav", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    var $a, $aRest, $lists, $listsRest, app;
                    return $lists = ele.find("ul").parent("li"), $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), app = $("#app"), $a.on("click", function (event) {
                        var $parent, $this;
                        return app.hasClass("nav-min") ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").slideToggle(), event.preventDefault())
                    }), $aRest.on("click", function () {
                        return $lists.removeClass("open").find("ul").slideUp()
                    }), scope.$on("minNav:enabled", function () {
                        return $lists.removeClass("open").find("ul").slideUp()
                    })
                }
            }
        }
    ]).directive("highlightActive", [
        function () {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", "$location",
                    function ($scope, $element, $attrs, $location) {
                        var highlightActive, links, path;
                        return links = $element.find("a"), path = function () {
                            return $location.path()
                        }, highlightActive = function (links, path) {
                            return path = "#" + path, angular.forEach(links, function (link) {
                                var $li, $link, href;
                                return $link = angular.element(link), $li = $link.parent("li"), href = $link.attr("href"), $li.hasClass("active") && $li.removeClass("active"), 0 === path.indexOf(href) ? $li.addClass("active") : void 0
                            })
                        }, highlightActive(links, $location.path()), $scope.$watch(path, function (newVal, oldVal) {
                            return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
                        })
                    }
                ]
            }
        }
    ]).directive("toggleOffCanvas", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return ele.on("click", function () {
                        return $("#app").toggleClass("on-canvas")
                    })
                }
            }
        }
    ]).directive("slimScroll", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return ele.slimScroll({
                        height: "100%"
                    })
                }
            }
        }
    ]).directive("goBack", [
        function () {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$window",
                    function ($scope, $element, $window) {
                        return $element.on("click", function () {
                            return $window.history.back()
                        })
                    }
                ]
            }
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("app.localization", []).factory("localize", ["$http", "$rootScope", "$window",
        function ($http, $rootScope, $window) {
            var localize;
            return localize = {
                language: "",
                url: void 0,
                resourceFileLoaded: !1,
                successCallback: function (data) {
                    return localize.dictionary = data, localize.resourceFileLoaded = !0, $rootScope.$broadcast("localizeResourcesUpdated")
                },
                setLanguage: function (value) {
                    return localize.language = value.toLowerCase().split("-")[0], localize.initLocalizedResources()
                },
                setUrl: function (value) {
                    return localize.url = value, localize.initLocalizedResources()
                },
                buildUrl: function () {
                    return localize.language || (localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase(), localize.language = localize.language.split("-")[0]), "i18n/resources-locale_" + localize.language + ".js"
                },
                initLocalizedResources: function () {
                    var url;
                    return url = localize.url || localize.buildUrl(), $http({
                        method: "GET",
                        url: url,
                        cache: !1
                    }).success(localize.successCallback).error(function () {
                        return $rootScope.$broadcast("localizeResourcesUpdated")
                    })
                },
                getLocalizedString: function (value) {
                    var result, valueLowerCase;
                    return result = void 0, localize.dictionary && value ? (valueLowerCase = value.toLowerCase(), result = "" === localize.dictionary[valueLowerCase] ? value : localize.dictionary[valueLowerCase]) : result = value, result
                }
            }
        }
    ]).directive("i18n", ["localize",
        function (localize) {
            var i18nDirective;
            return i18nDirective = {
                restrict: "EA",
                updateText: function (ele, input, placeholder) {
                    var result;
                    return result = void 0, "i18n-placeholder" === input ? (result = localize.getLocalizedString(placeholder), ele.attr("placeholder", result)) : input.length >= 1 ? (result = localize.getLocalizedString(input), ele.text(result)) : void 0
                },
                link: function (scope, ele, attrs) {
                    return scope.$on("localizeResourcesUpdated", function () {
                        return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder)
                    }), attrs.$observe("i18n", function (value) {
                        return i18nDirective.updateText(ele, value, attrs.placeholder)
                    })
                }
            }
        }
    ]).controller("LangCtrl", ["$scope", "localize",
        function ($scope, localize) {
            return $scope.lang = "English", $scope.setLang = function (lang) {
                switch (lang) {
                case "English":
                    localize.setLanguage("EN-US");
                    break;
                case "Español":
                    localize.setLanguage("ES-ES");
                    break;
                case "日本語":
                    localize.setLanguage("JA-JP");
                    break;
                case "中文":
                    localize.setLanguage("ZH-TW");
                    break;
                case "Deutsch":
                    localize.setLanguage("DE-DE");
                    break;
                case "français":
                    localize.setLanguage("FR-FR");
                    break;
                case "Italiano":
                    localize.setLanguage("IT-IT");
                    break;
                case "Portugal":
                    localize.setLanguage("PT-BR");
                    break;
                case "Русский язык":
                    localize.setLanguage("RU-RU");
                    break;
                case "한국어":
                    localize.setLanguage("KO-KR")
                }
                return $scope.lang = lang
            }
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("app.controllers", []).controller("AppCtrl", ["$scope", "$location",
        function ($scope, $location) {
            return $scope.isSpecificPage = function () {
                var path;
                return path = $location.path(), _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/lock-screen"], path)
            }, $scope.main = {
                brand: "Intrabits",
                name: "Lisa Doe"
            }
        }
    ]).controller("NavCtrl", ["$scope", "taskStorage", "filterFilter",
        function ($scope, taskStorage, filterFilter) {
            var tasks;
            return tasks = $scope.tasks = taskStorage.get(), $scope.taskRemainingCount = filterFilter(tasks, {
                completed: !1
            }).length, $scope.$on("taskRemaining:changed", function (event, count) {
                return $scope.taskRemainingCount = count
            })
        }
    ])
}.call(this);